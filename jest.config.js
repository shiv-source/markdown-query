/** @type {import('jest').Config} */

module.exports = {
    roots: ['<rootDir>/src/', '<rootDir>/test/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.[tj]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**', '!**/node_modules/**'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
}
