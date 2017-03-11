const { MODE } = process.env
const publicDir = (filePath) => `app/public${filePath}`
const srcDir = (filePath) => `app/src${filePath}`

module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			pages: {
				files: ['source/pages/**/*'],
				tasks: ['copy:pages']
			},
			fonts: {
				files: ['source/fonts/**/*'],
				tasks: ['copy:fonts']
			},
			sass: {
				files: ['source/sass/**/*'],
				tasks: ['sass:critical','sass:components']
			}
		},
		copy: {
			pages: {
				files: [
					{
						expand: true,
						cwd: 'source/pages',
						src: ['**/*'],
						dest: publicDir('/')
					},
				],
			},
			fonts: {
				files: [
					{
						expand: true,
						cwd: 'source/fonts',
						src: ['**/*'],
						dest: publicDir('/fonts'),
					},
				],
			}
		},
		sass: {
			critical: {
				options: {
					sourcemap: 'file',
					style: MODE === 'dev' ? 'expanded' : 'compressed'
				},
				files: [
					{
						expand: true,
						cwd: 'source/sass',
						src: ['critical.sass'],
						dest: publicDir('/css/'),
						ext: '.css'
					}
				]
			},
			components: {
				options: {
					sourcemap: 'none',
					style: 'compressed'
				},
				files: [
					{
						expand: true,
						cwd: 'source/sass/components',
						src: ['*'],
						dest: srcDir('/styles/'),
						ext: '.css'
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('build', ['copy:pages','copy:fonts','sass']);
	grunt.registerTask('default', ['watch']);
}