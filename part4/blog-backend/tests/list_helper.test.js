import dummy from "../utils/list_helper";

test('test ment to fail', () =>{
      const blog = []
      const result =dummy(blog)
      expect(result).toBe(1)
})

