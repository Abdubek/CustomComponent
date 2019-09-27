import React from 'react';
import './App.css';
import MonacoEditor from "react-monaco-editor";
import ReactDOM from 'react-dom';
//@ts-ignore
import JsxParser from 'react-jsx-parser/lib/react-jsx-parser.min'
import { ForEach } from './HelpComponents';

type Props = {}
type State = {
  script: string,
  isChanged: boolean,
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
        script: 'class Hello extends React.Component {\n' +
            '  render() {\n' +
            '    return React.createElement(\'div\', null, [\n' +
            '        React.createElement(\'span\', { className: "someClass" }, \'Hello world\'),\n' +
            '        React.createElement(\'span\', { className: "someClass" }, \'Yeahow\')\n' +
            '    ]);\n' +
            '  }\n' +
            '}\n' +
            '\n' +
            'ReactDOM.render(\n' +
            '  React.createElement(Hello, {toWhat: \'мир\'}, null),\n' +
            '  document.getElementById(\'customComp\')\n' +
            ');\n' +
            '\n' +
            '\n',
      isChanged: false,
    }
  }

  changeScript = (value: string, e: any) => {
    this.setState({ script: value })
  };

  apply = () => {
    this.setState({isChanged: true});
    new Function("React", "ReactDOM", this.state.script)(React, ReactDOM);
  };

  render() {
    try {
        return (
            <div className={"wrapper"}>
                <div style={{width: '70%', height: '100%'}}>
                    <div style={{height: '1px', background: '#fff', width: '100%'}}/>
                    <MonacoEditor
                        width={"100%"}
                        height={"100%"}
                        theme={'vs-dark'}
                        onChange={this.changeScript}
                        value={this.state.script}
                    />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
                    <div style={{width: '30%', height: '100%'}}>
                        <div id="customComp" />
                        {/*<JsxParser
                            bindings={{
                                text: [{name:"QWE"}, {name:"asd"}]
                            }}
                            blacklistedAttrs={[]}
                            blacklistedTags={[]}
                            components={{}}
                            jsx={this.state.html}
                        />*/}
                    </div>
                    <button
                        style={{width: '100%', height: '50px', backgroundColor: 'gray', border: 'none', color: 'white'}}
                        onClick={() => this.apply()}>
                        Apply
                    </button>
                </div>
            </div>
        )
    } catch (e) {
        return null;
    }
  }
}

export default App;
