export type SelectOption = {
    label: string
    value: number
}
export type SingleSelectProps = {
    multiple?: false
    onChange: (value: SelectOption | null) => void
    value?: SelectOption | null
}
export type MultiSelectProps = {
    multiple: true
    onChange: (value: SelectOption[]) => void
    value: SelectOption[]
}
export type SelectProps = {
    options: SelectOption[]
} & (MultiSelectProps | SingleSelectProps)