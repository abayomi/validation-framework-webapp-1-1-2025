import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3assets from 'aws-cdk-lib/aws-s3-assets';
import * as elasticbeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

console.log(__dirname);
console.log(__dirname);

export interface EBEnvProps extends cdk.StackProps {
  // Autoscaling group configuration
  minSize?: string;
  maxSize?: string;
  instanceTypes?: string;
  envName?: string;
}

export class EBApplnStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: EBEnvProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Construct an S3 asset Zip from directory up.
    const webAppZipArchive = new s3assets.Asset(this, 'WebAppZip', {
      path: `${__dirname}/../../`, // Adjusted to point two levels up
      exclude: ['cdk-deployment/**', // Exclude the entire cdk-deployment folder
        '.gitignore',        // Exclude the .gitignore file
        '.git/**',        // Exclude the .git file
        '.github/**',            // Exclude the .git directory
        'test/**',            // not needed for deployment
        '.eslintrc.json',            // not needed for deployment
        'jest.config.js',            // not needed for deployment
        'jest.setup.js',            // not needed for deployment
      ],
    });

    // Create a ElasticBeanStalk app.
    const appName = 'ValApp-cdk-is-subfolder';
    const app = new elasticbeanstalk.CfnApplication(this, 'Application', { applicationName: appName });

    // Create an app version from the S3 asset defined earlier
    const appVersionProps = new elasticbeanstalk.CfnApplicationVersion(this, 'AppVersion', {
      applicationName: appName,
      sourceBundle: {
        s3Bucket: webAppZipArchive.s3BucketName,
        s3Key: webAppZipArchive.s3ObjectKey,
      },
    });

    // Make sure that Elastic Beanstalk app exists before creating an app version
    appVersionProps.addDependency(app);

    // Create role and instance profile
    const myRole = new iam.Role(this, `${appName}-aws-elasticbeanstalk-ec2-role`, {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    });

    const managedPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier');
    myRole.addManagedPolicy(managedPolicy);

    const myProfileName = `${appName}-InstanceProfile`;

    const instanceProfile = new iam.CfnInstanceProfile(this, myProfileName, {
      instanceProfileName: myProfileName,
      roles: [myRole.roleName],
    });

    // Define the Launch Template
    const launchTemplate = new ec2.CfnLaunchTemplate(this, 'LaunchTemplate', {
      launchTemplateData: {
        instanceType: props?.instanceTypes ?? 't3.micro',
        securityGroupIds: ['sg-05c0b4a1432e93642'],
        iamInstanceProfile: {
          name: instanceProfile.instanceProfileName,
        },
        blockDeviceMappings: [
            {
              deviceName: '/dev/xvda',
              ebs: {
                volumeType: 'gp3',
                volumeSize: 10,
                iops: 3000,
                throughput: 125,
              },
            },
          ],
      },
    });

    // Example of some options which can be configured
    const optionSettingProperties: elasticbeanstalk.CfnEnvironment.OptionSettingProperty[] = [
      
      // Auto-scaling settings, us-east-2 ohio has t3.micro
      {
        namespace: 'aws:autoscaling:launchconfiguration',
        optionName: 'RootVolumeType',
        value: 'gp3',
      },
      {
        namespace: 'aws:autoscaling:asg',
        optionName: 'MinSize',
        value: props?.minSize ?? '1',
      },
      {
        namespace: 'aws:autoscaling:asg',
        optionName: 'MaxSize',
        value: props?.maxSize ?? '1',
      },
      {
        namespace: 'aws:ec2:instances',
        optionName: 'InstanceTypes',
        value: props?.instanceTypes ?? 't3.micro',
      },
      {
        namespace: 'aws:autoscaling:launchconfiguration',
        optionName: 'IamInstanceProfile',
        value: 'aws-elasticbeanstalk-ec2-role',
      },
    ];

    const elbEnv = new elasticbeanstalk.CfnEnvironment(this, 'Environment', {
      environmentName: props?.envName ?? "ValidationEnv-cdk-is-subfolder",
      applicationName: app.applicationName || appName,
      solutionStackName: '64bit Amazon Linux 2023 v6.4.0 running Node.js 22',
      optionSettings: optionSettingProperties,
      versionLabel: appVersionProps.ref,
    });
  }
}