import React from 'react';
import './App.css';
import MonacoEditor from "react-monaco-editor";
//@ts-ignore
import JsxParser from 'react-jsx-parser/lib/react-jsx-parser.min'
import { ForEach } from './HelpComponents';

type Props = {}
type State = {
  html: string,
  isChanged: boolean,
}


class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      html: '',
      isChanged: false,
    }
  }

  changeHtml = (value: string, e: any) => {
    this.setState({ html: value })
  };

  apply = () => {
    this.setState({isChanged: true})
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
                        language={"html"}
                        theme={'vs-dark'}
                        onChange={this.changeHtml}
                        value={this.state.html}
                    />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
                    <div style={{width: '30%', height: '100%'}}>
                        <JsxParser
                            bindings={{
                                text: [{name:"QWE"}, {name:"asd"}]
                            }}
                            blacklistedAttrs={[]}
                            blacklistedTags={[]}
                            components={{ForEach}}
                            jsx={this.state.html}
                        />
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
