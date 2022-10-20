module.exports = {
    apps: [
        {
            name: 'client',
            cwd: './packages/client',
            script: 'npm',
            args: 'start',
        },
        {
            name: 'server',
            cwd: './packages/server',
            script: 'npm',
            args: 'run start:dev'
        }
    ]
}
