import React, { ChangeEvent } from "react";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setLanguage } from "../../../common/store/languages/actions";

interface LangSwitchProps {
    dispatch:  Dispatch
}

class LangSwitch extends React.Component<LangSwitchProps> {
    handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        this.props.dispatch(setLanguage(e.target.value));
      };    
    
      render() {
        return (
          <select className="lang-select" onChange={this.handleLanguageChange}>
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
        );
      }
    
}

export default  connect()(LangSwitch);
