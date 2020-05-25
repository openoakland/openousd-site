import React from 'react'
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl'
import { NavDropdown } from 'react-bootstrap'
import changeLanguageIcon from '../images/icons/ic_change-language.svg'


const languageName = {
  en: "English",
  es: "Español",
}

const LanguagePicker = (props) => {

    const ChangeLanguageIcon = () =>
      (<img className="change-language-icon" src={changeLanguageIcon} alt="icon of language characters"/>)

    return (
        <div className={`${props.className} language-picker`}>
            <IntlContextConsumer>
                {({ languages, language: currentLocale }) => (
                    <NavDropdown alignRight title={<span><ChangeLanguageIcon/> {languageName[currentLocale]}</span>}>
                    {languages.map(language => (
                        <NavDropdown.Item
                          key={language}
                          onClick={() => changeLocale(language)}
                        >
                          {languageName[language]}
                        </NavDropdown.Item>
                    ))}
                    </NavDropdown>
                )
                }
            </IntlContextConsumer>
        </div>
    )
}

export default LanguagePicker
