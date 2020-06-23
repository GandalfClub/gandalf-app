module.exports = {
	extends: ['@commitlint/config-angular'],
	rules: {
		'header-max-length': [2, 'always', 100],
		'type-enum': [2, 'always', ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'mock']],
		'scope-enum': [
			2,
			'always',
			[
				"gandalf",
				"gandalf/frontend",
				"gandalf/backend"
			]
		]
	}
};
