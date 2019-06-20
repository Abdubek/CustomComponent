import React from 'react';
import './App.css';
import MonacoEditor from "react-monaco-editor";
//@ts-ignore
import JsxParser from 'react-jsx-parser'

type Props = {}
type State = {
  script: string,
  html: string,
  isChanged: boolean,
}

const scripts = window;

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      script: '',
      html: '',
      isChanged: false,
    }
  }

  changeScript = (value: string, e: any) => {
    this.setState({ script: value })
  };
  changeHtml = (value: string, e: any) => {
    this.setState({ html: value })
  };

  apply = () => {
    this.setState({isChanged: true})
  };

  render() {
    try {
      if (this.state.isChanged) {
        new Function("scripts", this.state.script)(scripts)
        this.setState({
          isChanged: false
        });
      }
    } catch(e) {
      console.error('error', e)
    }
    return (
      <div className={"wrapper"}>
        <div style={{width: '70%', height: '100%'}}>
          <MonacoEditor
            width={"100%"}
            height={"50%"}
            language={"javascript"}
            theme={'vs-dark'}
            onChange={this.changeScript}
            value={this.state.script}
          />
          <div style={{height: '1px', background: '#fff', width: '100%'}} />
          <MonacoEditor
            width={"100%"}
            height={"50%"}
            language={"html"}
            theme={'vs-dark'}
            onChange={this.changeHtml}
            value={this.state.html}
          />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
          <div style={{width: '30%', height: '100%'}}>
            <JsxParser
              binding={{
                clickHandler: () => {
                  console.log("qwe");
                }
              }}
              blacklistedAttrs={[]}
              blacklistedTags={[]}
              components={{}}
              jsx={`
                <ul uk-accordion={"true"}>
                  <li class="uk-open">
                      <a class="uk-accordion-title" href="#">Item 1</a>
                      <div class="uk-accordion-content">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                  </li>
                  <li>
                      <a class="uk-accordion-title" href="#">Item 2</a>
                      <div class="uk-accordion-content">
                          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
                      </div>
                  </li>
                  <li>
                      <a class="uk-accordion-title" href="#">Item 3</a>
                      <div class="uk-accordion-content">
                          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
                      </div>
                  </li>
              </ul>
              ` }
            />
          </div>
          <button style={{width: '100%', height: '50px', backgroundColor: 'gray', border: 'none', color: 'white'}}
                  onClick={() => this.apply()}>
            Apply
          </button>
        </div>
      </div>
    )
  }
}

export default App;
