module.exports = {
    hooks: {
        'pre-commit': 'yarn pre-commit',
        'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true',
        'commit-msg': 'commitlint -e $GIT_PARAMS',
    },
};
