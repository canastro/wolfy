const name = require('./package.json').name;

const deployTo = `/home/ubuntu/${name}`;
const deployToCurrent = `${deployTo}/current`;

module.exports = (shipit) => {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: `/Users/ricardocanastro/shipit-workspace/${name}`,
            deployTo,
            repositoryUrl: `https://github.com/canastro/${name}.git`,
            ignores: ['.git', 'node_modules'],
            keepReleases: 5,
            deleteOnRollback: false,
            key: '/Users/ricardocanastro/aws/wolfy-key.pem',
            shallowClone: true
        },
        staging: {
            servers: 'ubuntu@ec2-52-31-60-109.eu-west-1.compute.amazonaws.com'
        }
    });

    // Listen to the on published event.
    shipit.on('published', () => {
        shipit.start('post-publish');
    });

    shipit.task('post-publish', ['clear-nodemodules', 'npm-install', 'npm-link', 'build']);

    // npm install
    // ----------------------------------------------------------------
    shipit.blTask('clear-nodemodules', () =>
        shipit.remote(`cd ${deployToCurrent} && rm -rf node_modules`)
    );

    shipit.blTask('npm-install', () =>
        shipit.remote(`cd ${deployToCurrent} && npm install`)
    );

    shipit.blTask('npm-link', () =>
        shipit.remote(`cd ${deployToCurrent} && npm link node-sass`)
    );

    shipit.task('build', () =>
        shipit.remote(`cd ${deployToCurrent} && npm run build:production`)
    );

    // ngnix commands
    // ----------------------------------------------------------------
    shipit.blTask('nginx:reload', () =>
        shipit.remote('sudo service nginx reload').then(() =>
            shipit.emit('nginx:reloaded')
        )
    );
};
