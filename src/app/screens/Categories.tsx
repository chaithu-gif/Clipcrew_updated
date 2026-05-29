import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Camera,
  Search,
  Grid3X3,
  List,
  Star,
  MapPin,
  User,
} from "lucide-react";

import { Input } from "../components/ui/input";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import {
  Badge,
} from "../components/ui/badge";


// 🔥 FIREBASE
import {
  auth,
  db,
} from "../../firebase";

import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";


export default function Categories() {

  const navigate = useNavigate();

  const [creators, setCreators] =
    useState<any[]>([]);

  const [filteredCreators,
    setFilteredCreators] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [selectedCategory,
    setSelectedCategory] =
    useState("All");

  const [viewMode,
    setViewMode] =
    useState("grid");

  // 🔥 USER ROLE
  const [role, setRole] =
    useState("");


  // 🔥 CATEGORY LIST
  const categories = [
    "All",
    "Media",
    "Design",
    "Music",
    "Writing",
    "Development",
  ];


  // 🔥 FETCH USER ROLE
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          if (!user) return;

          try {

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

            setRole(
              userData?.role
            );

          } catch (error) {

            console.log(error);

          }
        }
      );

    return () => unsubscribe();

  }, []);


  // 🔥 FETCH CREATORS
  useEffect(() => {

    const fetchCreators =
      async () => {

        try {

          const creatorsRef =
            collection(
              db,
              "creators"
            );

          const snapshot =
            await getDocs(
              creatorsRef
            );

          const creatorData =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setCreators(
            creatorData
          );

          setFilteredCreators(
            creatorData
          );

        } catch (error) {

          console.log(error);

        }

        setLoading(false);
      };

    fetchCreators();

  }, []);


  // 🔥 FILTER CREATORS
  useEffect(() => {

    let filtered =
      creators;

    // CATEGORY FILTER
    if (
      selectedCategory !==
      "All"
    ) {

      filtered =
        filtered.filter(
          (creator: any) =>
            creator.category ===
            selectedCategory
        );
    }

    // SEARCH FILTER
    if (searchTerm) {

      filtered =
        filtered.filter(
          (creator: any) =>
            creator.name
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              ) ||
            creator.subCategory
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              )
        );
    }

    setFilteredCreators(
      filtered
    );

  }, [
    creators,
    searchTerm,
    selectedCategory,
  ]);


  // 🔥 LOADING
  if (loading) {

    return (
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white p-6 pb-6">

        <p className="text-gray-600">

          Loading creators...

        </p>

      </div>
    );
  }


  return (
    
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">

      {/* HEADER */}
     


        <div className="max-w-7xl mx-auto mb-6">
  <div className="bg-white/80 backdrop-blur-md rounded-full px-8 py-4 shadow-lg flex items-center justify-between">

    <div className="flex items-center gap-3">
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-2 rounded-xl">
        <Camera className="w-6 h-6 text-white" />
      </div>

      <h1 className="fancy-heading text-3xl text-gray-900">
        Clip Crew
      </h1>
    </div>

    <button
      onClick={() => {
        if (role === "creator") {
          navigate("/dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      }}
      className="p-2 rounded-full hover:bg-purple-100 transition"
    >
      <User className="w-6 h-6 text-gray-700" />
    </button>

  </div>
</div>
 


        {/* SEARCH */}
        <div className="max-w-7xl mx-auto mb-6">
  <div className="relative">
    <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

    <Input
      placeholder="Search creators..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="pl-12 bg-white/90 text-black rounded-2xl border-0 shadow-md h-14"
    />
  </div>
</div>

      


      {/* CONTENT */}
      <div className="max-w-7xl mx-auto">

        {/* FILTERS */}
        <div className="flex items-center justify-between mb-6">

          {/* CATEGORY BUTTONS */}
          <div className="flex gap-2 overflow-x-auto">

            {categories.map(
              (category) => (

                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory ===
                    category
                      ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-md"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >

                  {category}

                </button>
              )
            )}

          </div>


          {/* VIEW TOGGLE */}
          <div className="flex gap-2">

            <button
              onClick={() =>
                setViewMode(
                  "grid"
                )
              }
              className={`p-2 rounded-lg ${
                viewMode ===
                "grid"
                  ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >

              <Grid3X3 className="w-4 h-4" />

            </button>


            <button
              onClick={() =>
                setViewMode(
                  "list"
                )
              }
              className={`p-2 rounded-lg ${
                viewMode ===
                "list"
                  ?  "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >

              <List className="w-4 h-4" />

            </button>

          </div>

        </div>


        {/* CREATOR LIST */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 gap-4"
              : "space-y-4"
          }
        >

          {filteredCreators.length === 0 ? (

            <Card>

              <CardContent className="p-8 text-center">

                <p className="text-gray-500">

                  No creators found

                </p>

              </CardContent>

            </Card>

          ) : (

            filteredCreators.map(
              (creator: any) => (

                <Card
                  key={creator.id}
                  className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/creator/${creator.id}`
                    )
                  }
                >

                  <CardContent className="p-4">

                    <div className="flex gap-4">

                      {/* IMAGE */}
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0">

                        {creator.image ? (

                          <img
                            src={
                              creator.image
                            }
                            alt={
                              creator.name
                            }
                            className="w-full h-full object-cover"
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-2xl font-bold">

                            {creator.name?.charAt(
                              0
                            )}

                          </div>

                        )}

                      </div>


                      {/* DETAILS */}
                      <div className="flex-1">

                        <div className="flex justify-between items-start mb-2">

                          <div>

                            <h3 className="text-lg text-gray-900">

                              {creator.name}

                            </h3>

                            <p className="text-gray-600 text-sm">

                              {
                                creator.subCategory
                              }

                            </p>

                          </div>


                          <Badge className="bg-purple-100 text-purple-700">

                            {creator.category}

                          </Badge>

                        </div>


                        {/* RATING */}
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">

                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

                          <span>

                            {creator.rating || 0}

                          </span>

                          <span>

                            (
                            {creator.totalReviews || 0}
                            )

                          </span>

                        </div>


                        {/* LOCATION */}
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">

                          <MapPin className="w-4 h-4" />

                          <span>

                            {creator.location ||
                              "Unknown"}

                          </span>

                        </div>


                        {/* PRICE */}
                        <div className="flex justify-between items-center">

                          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent text-xl font-bold">

                            ₹
                            {creator.price?.toLocaleString()}

                          </span>


                          <Button
  size="sm"
  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white rounded-full"
>

                            View Profile

                          </Button>

                        </div>

                      </div>

                    </div>

                  </CardContent>

                </Card>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
}