import { NextResponse } from "next/server"

export function GET() {
  const users = [
    { name: "John Doe", email: "johndoe12@gmail.com", course: "java" },
    { name: "Serina", email: "serina2@gmail.com", course: "python" },
    { name: "Jenny", email: "jen43@gmail.com", course: "javaScript" },
  ]
  return NextResponse.json(users)
}

export function DELETE() {
  console.log("Delete user")
  return NextResponse.json({ message: "User deleted", status: 200 })
}

export function POST() {}

export function PUT() {}
