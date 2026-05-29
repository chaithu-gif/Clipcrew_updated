import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Camera, Mail, Lock, User } from "lucide-react";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

import { Label } from "../components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  RadioGroup,
  RadioGroupItem,
} from "../components/ui/radio-group";


// 🔥 FIREBASE
import { auth, db } from "../../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      // 🔥 CREATE USER
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔥 SAVE USER DATA
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role,
        createdAt: new Date(),
      });

      // 🔥 KEEP YOUR SAME NAVIGATION
     if (role === "creator") {

  navigate("/creator-setup");

} else {

  navigate("/categories");

}
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="max-w-6xl mx-auto w-full mb-10">
  <div className="bg-white/80 backdrop-blur-md rounded-full px-8 py-4 shadow-lg flex items-center justify-between">

    <div
      onClick={() => navigate("/")}
      className="flex items-center gap-3 cursor-pointer"
    >
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-2 rounded-xl">
        <Camera className="w-6 h-6 text-white" />
      </div>

      <h1 className="fancy-heading text-3xl text-gray-900">
        Clip Crew
      </h1>
    </div>

    <div className="flex items-center gap-6">
      <button onClick={() => navigate("/")} className="text-gray-600 hover:text-purple-600">
        Home
      </button>

      <button onClick={() => navigate("/about")} className="text-gray-600 hover:text-purple-600">
        About
      </button>

      <button onClick={() => navigate("/contact")} className="text-gray-600 hover:text-purple-600">
        Contact
      </button>
    </div>

  </div>
</div>

      <div className="flex-1 flex items-center justify-center pb-8">
        <Card className="w-full max-w-lg bg-white/80 backdrop-blur-md border border-white/50 rounded-[32px] shadow-xl">
          <CardHeader>
            <CardTitle className="fancy-heading text-4xl text-center">
  Create{" "}
  <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
    Account
  </span>
</CardTitle>

            <CardDescription className="text-center text-gray-500">
  Join the Clip Crew community
</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">

              {/* NAME */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>

                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 rounded-2xl border border-gray-200 bg-white/80 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-2xl border border-gray-200 bg-white/80 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 rounded-2xl border border-gray-200 bg-white/80 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* ROLE */}
              <div className="mt-2">
                <Label>I am a</Label>
                

                <div className="grid grid-cols-2 gap-4">
  <button
    type="button"
    onClick={() => setRole("customer")}
    className={`p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
      role === "customer"
        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-lg"
        : "bg-white border-gray-200"
    }`}
  >
    <h3 className="font-semibold">Customer</h3>
    <p className="text-sm">Looking to hire</p>
  </button>

  <button
    type="button"
    onClick={() => setRole("creator")}
    className={`p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
      role === "creator"
        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-lg"
        : "bg-white border-gray-200"
    }`}
  >
    <h3 className="font-semibold">Creator</h3>
    <p className="text-sm">Offering services</p>
  </button>
</div>
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white rounded-full h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
              </Button>

              {/* LOGIN */}
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent font-semibold hover:opacity-80"
                >
                  Login
                </button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}