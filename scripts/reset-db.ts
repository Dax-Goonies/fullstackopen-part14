// Reset the database for manual testing
const main = async () => {
  const response = await fetch('http://localhost:3000/api/testing/reset', {
    method: 'DELETE',
  })
  const result = await response.json()
  console.log(result)
}

main()