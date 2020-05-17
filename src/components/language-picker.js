import React from 'react'
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl'
import { NavDropdown } from 'react-bootstrap'


const languageName = {
  en: "English",
  es: "Español",
}

const LanguagePicker = () => {

    return (
        <div id="language-picker" className="">
            <IntlContextConsumer>
                {({ languages, language: currentLocale }) => (
                    <NavDropdown title={languageName[currentLocale]}>
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
