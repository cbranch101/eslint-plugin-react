/**
 * @fileoverview Prevent missing props validation in a React component definition
 * @author Yannick Croissant
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/prop-types');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

const settings = {
  react: {
    pragma: 'Foo'
  }
};

require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('prop-types', rule, {

  valid: [],
  invalid: [
    // {
    //   code: [
    //     'class Hello extends React.Component {',
    //     '  render() {',
    //     '    const { d: { a: { c } } } = this.props',
    //     '    return <div>Hello</div>;',
    //     '  }',
    //     '}',
    //     'Hello.propTypes = {',
    //     '  a: PropTypes.shape({',
    //     '  })',
    //     '};'
    //   ].join('\n'),
    //   errors: [{
    //     message: '\'a.b\' is missing in props validation'
    //   }]
    // }
    {
        code: [
          'class Hello extends React.Component {',
          '  render() {',
          '    const foo = { bar: 1 }',
          '    const { bar } = foo',
          '    const { props: { a } } = this',
          '    const { b: { c } } = a',
          '    const { d } = c',
          '    return <div>Hello{d.e.f}</div>;',
          '  }',
          '}',
          'Hello.propTypes = {',
          '  a: PropTypes.shape({',
          '  })',
          '};'
        ].join('\n'),
        errors: [{
          message: '\'a.b\' is missing in props validation'
        }]
      }
  ]
});
