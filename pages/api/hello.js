
export default function handler(req, res) {
  res.status(200).json({ food: "banana"})
}

// We wont necessarily touch this part, this is hte backend api folder. Each file holds serverless function.`