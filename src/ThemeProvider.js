import * as React from 'react'

import { ThemeModes } from './constants'
import { ThemeContext } from './context'

const ThemeProvider = ({
  children,
  darkTheme = { mode: ThemeModes.DARK },
  lightTheme = { mode: ThemeModes.LIGHT }
}) => {
  /**
   * @theme object contain color values for selected theme. it also have a additional parameter 'mode' which
   * determine if selected theme is light or dark.
   */
  const [theme, setTheme] = React.useState(lightTheme)

  /**
   * @themeMode is type of mode which is selected for applying theme. it can be light, dark or device theme.
   * if device theme is selected then it will apply light or dark theme based on device theme.
   */
  const [themeMode, setThemeMode] = React.useState(ThemeModes.LIGHT)

  /**
   * It is a common method to set new theme
   * @param newTheme new theme to be set
   * @param deviceColorScheme device color scheme
   */
  const onChangeTheme = React.useCallback(
    (newTheme, deviceColorScheme) => {
      setThemeMode(newTheme)

      if (newTheme === ThemeModes.DEVICE_THEME) {
        setTheme(deviceColorScheme === 'dark' ? darkTheme : lightTheme)
      } else {
        setTheme(newTheme === ThemeModes.DARK ? darkTheme : lightTheme)
      }
    },
    [darkTheme, lightTheme]
  )

  /**
   * Change theme method
   */
  const changeThemeMemo = React.useMemo(
    () => ({
      changeTheme: async (newTheme) => {
        const deviceColorScheme = 'Device color Scheme'
        onChangeTheme(newTheme, deviceColorScheme)
      }
    }),
    [onChangeTheme]
  )

  /**
   * content to be exported for external use
   */
  const globalContent = {
    themeMode: themeMode,
    theme: theme,
    setTheme: changeThemeMemo.changeTheme,
    isDarkTheme: theme.mode === ThemeModes.DARK
  }

  /**
   * ThemeContext Provider - it wrap application
   */
  return (
    <ThemeContext.Provider value={globalContent}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
