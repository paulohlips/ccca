import validateCpf from "./validateCpf-before"

test("Should return true when cpf is valid and false if invalid", function () {
  expect(validateCpf("111.111.111-11")).toBe(false)
  expect(validateCpf("123.456.789-99")).toBe(false)
  expect(validateCpf("935.411.347-80")).toBe(true)
})
"93541134780"