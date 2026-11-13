
import { useState } from 'react'

function App() {

  // Store expenses
  const [expenses, setExpenses] = useState([])

  // Form states
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')

  // Filter state
  const [filter, setFilter] = useState('All')

  // Calculate total expenses
  const total = expenses.reduce((sum, item) => {
    return sum + item.amount
  }, 0)

  // Filter expenses
  const filteredExpenses = expenses.filter((item) => {
    return filter === 'All' || item.category === filter
  })

  // Add expense
  const addExpense = (e) => {
    e.preventDefault()

    if (!name.trim() || !amount || Number(amount) <= 0) {
      alert('Please enter valid details')
      return
    }

    const newExpense = {
      id: Date.now(),
      name: name,
      amount: Number(amount),
      category: category
    }

    setExpenses([...expenses, newExpense])

    setName('')
    setAmount('')
    setCategory('Food')
  }


  const deleteExpense = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Expense Tracker
        </h1>

      
        <div className="bg-green-100 p-5 rounded-lg mb-6 text-center">

          <h2 className="text-lg font-semibold">
            Total Expenses
          </h2>

          <p className="text-3xl font-bold text-green-700">
            {total.toLocaleString()} RWF
          </p>

        </div>

        
        <form onSubmit={addExpense} className="  space-y-4 ">

          <input
            type="text"
            placeholder="Expense name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg"
          /><br></br>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-3 rounded-lg"
          /><br></br>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-3 rounded-lg"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-800"
          >
            Add Expense<br></br>
          </button>

        </form>

       
        <div className="mt-8">

          <h2 className="font-bold mb-2">
            Filter by Category
          </h2>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full border p-3 rounded-lg"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>

        </div>

   
        <div className="mt-6">

          <h2 className="text-xl font-bold mb-4">
            Expense List
          </h2>

          {filteredExpenses.length === 0 ? (

            <p className="text-gray-500 text-center">
              No expenses found.
            </p>

          ) : (

            filteredExpenses.map((item) => (

              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded-lg mb-3"
              >

                <div>
                  <h3 className="font-bold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    {item.category}
                  </p>

                  <p className="text-green-600 font-semibold">
                    {item.amount.toLocaleString()} RWF
                  </p>
                </div>

                <button
                  onClick={() => deleteExpense(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  )
}

export default App
