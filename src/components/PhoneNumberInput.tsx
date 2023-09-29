import { PhoneNumberUtil } from "google-libphonenumber"
import { TextInput } from "react-native"
import { useRef } from "react"

const phoneUtil = PhoneNumberUtil.getInstance()

function formatNumber(raw: string) {
	if (raw.length === 0) {
		return "Your #"
	}
	if (raw.length <= 3) {
		return `+1 ${raw}`
	}
	if (raw.length <= 6) {
		return `+1 (${raw.slice(0, 3)}) ${raw.slice(3)}`
	}
	return `+1 (${raw.slice(0, 3)}) ${raw.slice(3, 6)} - ${raw.slice(6)}`
}
function unformatNumber(formatted: string) {
	return formatted.slice(2).replaceAll(/[^0-9]/g, "")
}

export default function PhoneNumberInput({
	setIsValid,
	...props
}: TextInput["props"] & {
	setIsValid?: (_: boolean) => void
}) {
	const countryCode = "+1"
	const { value, onChangeText } = props
	const formatted = formatNumber(value ?? "")

	const ref = useRef<TextInput>(null)
	return (
		<TextInput
			ref={ref}
			{...props}
			style={[
				props.style,
				(value ?? "")?.length === 0 && { color: "gray" },
			]}
			value={formatted}
			textContentType="telephoneNumber"
			onChangeText={(newValue) => {
				const unformatted = unformatNumber(newValue)
				onChangeText!(unformatted)
				if (setIsValid && unformatted.length > 1) {
					const phone = phoneUtil.parse(
						`${countryCode}${unformatted}`
					)
					setIsValid(phoneUtil.isValidNumber(phone))
				}
			}}
			onFocus={() => {
				if (ref && ref.current) {
					ref.current?.setNativeProps({
						selection: {
							start: formatted.length,
							end: formatted.length,
						},
					})
				}
			}}
			onSelectionChange={() => {
				ref.current?.setNativeProps({
					selection: {
						start: formatted.length,
						end: formatted.length,
					},
				})
			}}
		/>
	)
}
