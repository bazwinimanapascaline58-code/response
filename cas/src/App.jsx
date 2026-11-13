
import { useState } from 'react'

function App() {
  const [expenses, setExpenses] = useState([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [filter, setFilter] = useState('All')

  // Calculate total
  const total = expenses.reduce((sum, item) => sum + item.amount, 0)

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

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-purple-100 p-4 sm:p-8">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-3">
            Expense Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your money and track your spending.
          </p>
        </div>

        {/* Total Expenses */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-xl mb-8 text-center">
          <h2 className="text-xl font-semibold mb-3">
            Total Expenses
          </h2>

          <p className="text-4xl sm:text-5xl font-extrabold">
            {total.toLocaleString()} RWF
          </p>

          <p className="text-blue-100 mt-3">
            {expenses.length} expenses recorded
          </p>
        </div>

        {/* Add Expense Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            + Add New Expense
          </h2>

          <form onSubmit={addExpense} className="space-y-5">

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Expense Name
              </label>

              <input
                type="text"
                placeholder="e.g. Lunch"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Amount (RWF)
              </label>

              <input
                type="number"
                min="1"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold p-4 rounded-xl hover:bg-blue-800 hover:shadow-lg active:scale-95 transition duration-300"
            >
              + Add Expense
            </button>

          </form>
        </div>

        {/* Filter */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Filter by Category
          </h2>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>

        </div>

        {/* Expense List */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Expense History
            </h2>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
              {filteredExpenses.length} items
            </span>
          </div>

          {filteredExpenses.length === 0 ? (

            <div className="text-center py-10">
              <p className="text-5xl mb-4">$</p>
              <p className="text-gray-500 font-medium">
                No expenses found.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Add your first expense to get started.
              </p>
            </div>

          ) : (

            <div className="space-y-4">

              {filteredExpenses.map((item) => (

                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border border-gray-200 p-5 rounded-xl hover:bg-blue-50 hover:shadow-md transition duration-300"
                >

                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.name}
                    </h3>

                    <span className="inline-block bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full mt-2">
                      {item.category}
                    </span>

                    <p className="text-green-600 font-bold text-lg mt-2">
                      {item.amount.toLocaleString()} RWF
                    </p>
                  </div>

                  <button
                    onClick={() => deleteExpense(item.id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 hover:shadow-md transition duration-300"
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 mt-8 pb-4">
          <p>© 2026 Manage Your Moneyyyyyyyyyyyyyyyy </p>
        </footer>

      </div>
    </div>
  )
}

export default App
