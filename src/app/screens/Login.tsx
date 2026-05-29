import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Camera,
  Mail,
  Lock,
} from "lucide-react";

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


// 🔥 FIREBASE
import {
  auth,
  db,
} from "../../firebase";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";


export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // 🔥 ROLE
  const [role, setRole] =
    useState<
      "customer" | "creator"
    >("customer");


  // 🔥 LOGIN
  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      // 🔥 FIREBASE LOGIN
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        userCredential.user;


      // 🔥 GET USER DATA
      const userDoc =
        await getDoc(
          doc(
            db,
            "users",
            user.uid
          )
        );

      const userData =
        userDoc.data();


      // 🚫 WRONG ROLE LOGIN
      if (
        userData?.role !== role
      ) {

        alert(
          `This account is registered as ${userData?.role}`
        );

        return;
      }


      // 🔥 NAVIGATION
      if (role === "creator") {

        navigate("/dashboard");

      } else {

        navigate("/categories");

      }

    } catch (error: any) {

      console.log(error);

      alert(error.message);

    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col p-6">

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

    <button
      onClick={() => navigate("/")}
      className="text-gray-600 hover:text-purple-600 font-medium transition"
    >
      Home
    </button>
    <button
    onClick={() => navigate("/about")}
    className="text-gray-600 hover:text-purple-600 transition"
  >
    About
  </button>

  <button
    onClick={() => navigate("/contact")}
    className="text-gray-600 hover:text-purple-600 transition"
  >
    Contact
  </button>

  </div>
</div>


      {/* LOGIN CARD */}
      <div className="flex-1 flex items-center justify-center">

        <Card className="w-full max-w-lg bg-white/80 backdrop-blur-md border border-white/50 rounded-[32px] shadow-xl">

          <CardHeader>

            <CardTitle className="fancy-heading text-4xl text-center">
  Welcome{" "}
  <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
    Back
  </span>
</CardTitle>

            <CardDescription className="text-center text-gray-500 text-base">
  Login to continue your creative journey
</CardDescription>

          </CardHeader>

          <CardContent>

            {/* ROLE SELECTOR */}
            <div className="grid grid-cols-2 gap-2 mb-6">

              <button
                type="button"
                onClick={() =>
                  setRole(
                    "customer"
                  )
                }
                className={`p-3 rounded-2xl font-medium transition-all duration-300 ${
                  role ===
                  "customer"
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-md"
                    : "bg-white/70 text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >

                Customer

              </button>


              <button
                type="button"
                onClick={() =>
                  setRole(
                    "creator"
                  )
                }
                className={`p-3 rounded-2xl font-medium transition-all duration-300 ${
  role === "creator"
    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-md"
    : "bg-white/70 text-gray-700 border border-gray-200 hover:bg-gray-50"
}`}
              >

                Creator

              </button>

            </div>


            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >

              {/* EMAIL */}
              <div className="space-y-2">

                <Label htmlFor="email">
                  Email
                </Label>

                <div className="relative">

                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="pl-10 rounded-2xl border border-gray-200 bg-white/80 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}
              <div className="space-y-2">

                <Label htmlFor="password">
                  Password
                </Label>

                <div className="relative">

                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="pl-10 rounded-2xl border border-gray-200 bg-white/80 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />

                </div>

              </div>


              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white rounded-full h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >

                {loading
                  ? "Logging in..."
                  : `Login as ${
                      role ===
                      "creator"
                        ? "Creator"
                        : "Customer"
                    }`}

              </Button>


              {/* REGISTER */}
              <div className="text-center text-sm text-gray-600 pt-2">
  New to Clip Crew?

  <button
    type="button"
    onClick={() => navigate("/register")}
    className="ml-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent font-semibold"
  >
    Create Account
  </button>
</div>

            </form>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}