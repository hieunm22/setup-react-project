/* eslint-disable max-len */
import * as helper from "./helper"

describe("test formatNumber", () => {
	test("test number < 1000", () => {
		expect(helper.formatNumber(123)).toBe("123")
		expect(helper.formatNumber(-456)).toBe("-456")
	})

	test("test number >= 1000", () => {
		expect(helper.formatNumber(1234)).toBe("1.234")
		expect(helper.formatNumber(-5678)).toBe("-5.678")
	})

	test("test with decimal number", () => {
		expect(helper.formatNumber(1.234)).toBe("1,234")
		expect(helper.formatNumber(1.2345678)).toBe("1,235")
		expect(helper.formatNumber(123456.789)).toBe("123.456,789")
		expect(helper.formatNumber(1234.56789)).toBe("1.234,568")
	})
})
