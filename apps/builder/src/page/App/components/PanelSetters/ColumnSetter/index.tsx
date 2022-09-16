import { FC, useCallback } from "react"
import { OptionListHeader } from "./header"
import { ListBody } from "./body"
import { OptionListSetterProps } from "./interface"
import { ListStyle } from "./style"
import { generateNewOptionItem } from "./utils/generateNewOptions"
import { OptionListSetterProvider } from "./context/optionListContext"
import { useTranslation } from "react-i18next"

export const ColumnSetter: FC<OptionListSetterProps> = (props) => {
  const {
    attrName,
    handleUpdateDsl,
    value = [],
    childrenSetter,
    widgetDisplayName,
  } = props
  const { t } = useTranslation()

  const handleAddOption = useCallback(() => {
    const num = value.length + 1
    const newItem = generateNewOptionItem(num)
    handleUpdateDsl(attrName, [...value, newItem])
  }, [value, attrName, handleUpdateDsl])

  if (!Array.isArray(childrenSetter) || childrenSetter.length === 0) {
    return null
  }

  return (
    <OptionListSetterProvider
      childrenSetter={childrenSetter}
      widgetDisplayName={widgetDisplayName}
      optionItems={value}
      attrPath={attrName}
      handleUpdateDsl={handleUpdateDsl}
    >
      <div css={ListStyle}>
        <OptionListHeader
          labelName={t("editor.inspect.setter_content.column_setter.title")}
          handleAddOption={handleAddOption}
        />
        <ListBody />
      </div>
    </OptionListSetterProvider>
  )
}

ColumnSetter.displayName = "ColumnSetter"
