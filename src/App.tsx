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
              components={{ Btn }}
              jsx={`<button key="1" onClick={clickHandler}> Нажми меня! </button>` }
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

class Btn extends React.Component<{press: () => void}>{

  render() {
    return (
      <button onClick={this.props.press}>Click</button>
    )
  }
}
