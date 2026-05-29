import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Star,
  MapPin,
  Briefcase,
  MessageCircle,
} from "lucide-react";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";


// 🔥 FIREBASE
import { db } from "../../firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";


export default function CreatorProfile() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [creator, setCreator] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);


  // 🔥 FETCH CREATOR
  useEffect(() => {

    const fetchCreator =
      async () => {

        try {

          const creatorRef =
            doc(
              db,
              "creators",
              id as string
            );

          const creatorSnap =
            await getDoc(
              creatorRef
            );

          if (
            creatorSnap.exists()
          ) {

            setCreator({
              id:
                creatorSnap.id,
              ...creatorSnap.data(),
            });

          } else {

            setCreator(null);

          }

        } catch (error) {

          console.log(error);

        }

        setLoading(false);
      };

    fetchCreator();

  }, [id]);


  // 🔥 LOADING
  if (loading) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">

        <p className="text-gray-600">

          Loading creator...

        </p>

      </div>
    );
  }


  // 🔥 NOT FOUND
  if (!creator) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">

        <p className="text-gray-600">

          Creator not found

        </p>

      </div>
    );
  }


  // 🔥 MERGE MEDIA
  const allMedia = [
    ...(creator.portfolioImages || []),
    ...(creator.portfolioVideos || []),
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white p-8 rounded-b-3xl shadow-lg">

        <button
          onClick={() =>
            navigate(-1)
          }
          className="p-2 hover:bg-blue-500 rounded-full transition-colors mb-4"
        >

          <ArrowLeft className="w-5 h-5" />

        </button>


        <div className="flex items-start gap-4">
          <button
  onClick={() => navigate(-1)}
  className="absolute top-6 left-6 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
>
  <ArrowLeft className="w-5 h-5 text-white" />
</button>

          {/* PROFILE IMAGE */}
          <div className="w-24 h-24 rounded-3xl overflow-hidden bg-white/20 shrink-0 shadow-lg border-2 border-white/30">

            {creator.image ? (

              <img
                src={creator.image}
                alt={creator.name}
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full flex items-center justify-center text-3xl text-white">

                {creator.name?.charAt(0)}

              </div>

            )}

          </div>


          <div className="flex-1">

            <h1 className="text-2xl mb-2">

              {creator.name}

            </h1>

            <p className="text-blue-100 mb-3">

              {creator.subCategory}

            </p>


            <div className="flex items-center gap-4 text-sm">

              {/* RATING */}
              <div className="flex items-center gap-1">

                <Star className="w-4 h-4 fill-white text-white" />

                <span>
                  {creator.rating || 0}
                </span>

                <span className="text-blue-200">

                  (
                  {creator.totalReviews || 0}
                  )

                </span>

              </div>


              {/* EXPERIENCE */}
              <div className="flex items-center gap-1">

                <Briefcase className="w-4 h-4" />

                <span>

                  {creator.experience || 0}
                  {" "}
                  years

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* CONTENT */}
      <div className="p-6 space-y-6">

        {/* LOCATION & PRICE */}
        <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-white/50">

          <CardContent className="p-4">

            <div className="flex items-center justify-between">

              {/* LOCATION */}
              <div className="flex items-center gap-2 text-gray-700">

                <MapPin className="w-5 h-5 text-gray-400" />

                <span>

                  {creator.location ||
                    "Unknown"}

                </span>

              </div>


              {/* PRICE */}
              <div className="text-right">

                <div className="text-sm text-gray-600">

                  Starting from

                </div>

                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">

                  ₹
                  {creator.price?.toLocaleString() || 0}

                </div>

              </div>

            </div>

          </CardContent>

        </Card>


        {/* ABOUT */}
        <div>

          <h2 className="text-lg text-gray-900 mb-3">

            About

          </h2>

          <Card className="border-gray-200">

            <CardContent className="p-4">

              <p className="text-gray-700 leading-relaxed">

                {creator.about ||
                  "No description available"}

              </p>

            </CardContent>

          </Card>

        </div>


        {/* PORTFOLIO */}
        <div>

          <h2 className="text-lg text-gray-900 mb-3">

            Portfolio

          </h2>


          <Tabs
            defaultValue="all"
            className="w-full"
          >

            <TabsList className="w-full">

              <TabsTrigger
                value="all"
                className="flex-1"
              >

                All (
                {allMedia.length}
                )

              </TabsTrigger>


              <TabsTrigger
                value="images"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:via-pink-500 data-[state=active]:to-orange-400 data-[state=active]:text-white"
              >

                Images (
                {creator.portfolioImages?.length || 0}
                )

              </TabsTrigger>


              <TabsTrigger
                value="videos"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:via-pink-500 data-[state=active]:to-orange-400 data-[state=active]:text-white"
              >

                Videos (
                {creator.portfolioVideos?.length || 0}
                )

              </TabsTrigger>

            </TabsList>


            {/* ALL */}
            <TabsContent
              value="all"
              className="mt-4"
            >

              <div className="grid grid-cols-2 gap-3">

                {allMedia.map(
                  (
                    url: string,
                    idx: number
                  ) => (

                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >

                      <img
                        src={url}
                        alt={`Portfolio ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />

                    </div>
                  )
                )}

              </div>


              {allMedia.length === 0 && (
  <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-white/50">
    <CardContent className="p-10 text-center">
      <div className="text-5xl mb-4">📸</div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Portfolio Coming Soon
      </h3>

      <p className="text-gray-500">
        This creator has not uploaded portfolio items yet.
      </p>
    </CardContent>
  </Card>
)}

            </TabsContent>


            {/* IMAGES */}
            <TabsContent
              value="images"
              className="mt-4"
            >

              <div className="grid grid-cols-2 gap-3">

                {(creator.portfolioImages || []).map(
                  (
                    url: string,
                    idx: number
                  ) => (

                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >

                      <img
                        src={url}
                        alt={`Image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />

                    </div>
                  )
                )}

              </div>

            </TabsContent>


            {/* VIDEOS */}
            <TabsContent
              value="videos"
              className="mt-4"
            >

              <div className="grid grid-cols-2 gap-3">

                {(creator.portfolioVideos || []).map(
                  (
                    url: string,
                    idx: number
                  ) => (

                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >

                      <img
                        src={url}
                        alt={`Video ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />

                    </div>
                  )
                )}

              </div>

            </TabsContent>

          </Tabs>

        </div>

      </div>


      {/* FIXED BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">

        <div className="flex gap-3 max-w-2xl mx-auto">

          {/* CHAT */}
          <Button
            variant="outline"
            className="flex-1 rounded-full border-purple-500 text-purple-600 hover:bg-purple-50"
            onClick={() =>
              alert(
                "Chat feature coming soon!"
              )
            }
          >

            <MessageCircle className="w-4 h-4 mr-2" />

            Chat

          </Button>


          {/* BOOK */}
          <Button
            className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white rounded-full"
            onClick={() =>
              navigate(
                `/booking/${creator.id}`
              )
            }
          >

            Book Now

          </Button>

        </div>

      </div>

    </div>
  );
}