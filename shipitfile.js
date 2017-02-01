module.exports = shipit => {
  require('shipit-deploy')(shipit)

  const localDeployDir = './deploy'
  const prodServerIp = '192.241.223.201'

  shipit.initConfig({
    default: {
      workspace: localDeployDir,
      deployTo: './dashboard-deploys',
      repositoryUrl: 'git@github.com:julioolvr/challonge-dashboard.git',
      ignores: ['.git', 'node_modules', '.env'],
      keepReleases: 5
    },

    prod: {
      servers: `deploy@${prodServerIp}`
    }
  })

  shipit.blTask('build', () => {
    // TODO: This should decide the IP based on the environment being deployed to,
    // it will matter if we eventually have more than one.
    return shipit.local(`REACT_APP_BACKEND_URL=http://${prodServerIp}/api/graphql npm run client:build`, { cwd: localDeployDir })
  })

  shipit.on('fetched', () => {
    return shipit.start('build')
  })
}
