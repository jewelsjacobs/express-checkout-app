
import React from 'react';
import { Link } from 'react-router';

import { Header } from './header';
import { Editor } from './editor';
import { Code } from './code';
import classNames from 'classnames';
import ResponsiveEmbed from 'react-responsive-embed';

import * as patterns from '../patterns';

let layout = [

    {
      name: 'API and SDKs',
      patterns: [
            patterns.api
      ]
    },

    {
        name: 'Button Styles',
        patterns: [
            patterns.checkout, patterns.credit, patterns.pay, patterns.buynow, patterns.generic, patterns.responsive
        ]
    },

    {
        name: 'Checkout Customizations',
        patterns: [
            patterns.experience, patterns.mark, patterns.confirm, patterns.validation
        ]
    }
];

export class App extends React.Component {

  constructor() {
    super();
    this.state = {
      env: 'sandbox',
      errors: []
    };
  }

  onChangeCode(code) {
    this.setState({code, errors: []});
  }

  componentWillMount() {
    if (window.location.hash === '#/') {
      window.location.hash = '#/pattern/server';
    }

    paypal.onPossiblyUnhandledException(err => {
      this.setState({errors: this.state.errors.concat(err.stack || err.toString())});
    });
  }

  onChangeEnv(env) {
    this.setState({env});
  }

  onCodeRun(code) {
    this.setState({errors: []});
  }

  onCodeError(err) {
    this.setState({errors: this.state.errors.concat(err.stack || err.toString())});
  }

  render() {

    let patternName = this.props.params.pattern || 'api';
    let activePattern = patterns[patternName];

    if (!activePattern) {
      activePattern = patterns.api;
    }

    let env = this.state.env;
    let baseURL = document.body.getAttribute('data-base-url');

    let columnRightClassNames = classNames(
      {
        'column-right': activePattern.slug !== 'api',
        'column-right-wide': activePattern.slug === 'api'
      }
    );

    return (
      <div>
        <Header onChangeEnv={env => this.onChangeEnv(env)}/>
        <div className="main">
          <div className="column-left">
            {
              layout.map((group, i) =>
                <div key={i}>
                  <h3>{group.name}</h3>
                  <ul>
                    {
                      group.patterns.map(pattern =>
                        (!pattern.nosidebar) &&
                        <Link to={`/pattern/${pattern.slug}`} key={pattern.slug} activeClassName="active">
                          <li>
                            <span className="bullet"></span>
                            <span>{pattern.name}</span>
                          </li>
                        </Link>
                      )
                    }
                  </ul>
                </div>
              )
            }
          </div>

          { activePattern.slug !== 'api' && <div className="column-middle">
            <div className="intro">
              <h3>{activePattern.fullName}</h3>
              <div className="introp">{activePattern.intro}</div>
            </div>
            <div className="demo">
              <div className="steps">

                <div className="step right">1. Edit the code</div>

                <div className="step bottom">2. Try the button</div>

                {this.state.errors.length
                  ? <div className="errors">
                    {
                      this.state.errors.map(err =>
                        <p key={err}>{err}</p>
                      )
                    }
                  </div>

                  : <Code
                    setup={activePattern.setup}
                    pattern={patternName}
                    code={this.state.code}
                    onError={err => this.onCodeError(err)}/>
                }

                <div className="step right">3. Copy code to your site!</div>
              </div>
            </div>
          </div> }

          <div className={columnRightClassNames}>

            { activePattern.slug !== 'api'
              ? <Editor code={activePattern.code({env, baseURL})} onChange={val => this.onChangeCode(val)}/>
              :
              <ResponsiveEmbed src='https://jewelsjacobs.github.io/paypal-express-checkout-api/' />
            }

          </div>
        </div>
      </div>
    );
  }
}
