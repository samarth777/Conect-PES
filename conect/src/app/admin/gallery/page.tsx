"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import {
  Users,
  FolderOpenDotIcon,
  Calendar,
  Cable,
  Library,
  PlusSquare,
  Pencil,
  Trash2,
  Home,
  FileImage,
  FileBadge,
} from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

interface Gallery {
  _id: string;
  title: string;
  image: string;
  position: number;
}

const tabsData = [
  { id: "home", icon: <Home />, label: "Home" },
  { id: "projects", icon: <FolderOpenDotIcon />, label: "Projects" },
  { id: "events", icon: <Calendar />, label: "Events" },
  { id: "achievements", icon: <Calendar />, label: "Achievements" },
  { id: "members", icon: <Users />, label: "Members" },
  { id: "facilities", icon: <Cable />, label: "Facilities" },
  { id: "publications", icon: <Library />, label: "Publications" },
  { id: "gallery", icon: <FileImage />, label: "Gallery" },
  { id: "certificates", icon: <FileBadge />, label: "Certificates" },
];

export default function GalleryDashboard() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [photos, setPhotos] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleDelete = async (photoId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/gallery/delete/${photoId}`
      );
      if (response.status === 200) {
        setPhotos(photos.filter((photo) => photo._id !== photoId));
      } else {
        console.error("Failed to delete photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  function handleLogout() {
    localStorage.clear();
    router.push("/");
  }

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/gallery/all`
        );
        let newPhotos = response.data.map((photo: Gallery) => {
          const matchResult = photo.image.match(/file\/d\/(.*?)\//);
          if (matchResult) {
            const fileId = matchResult[1];
            const newImageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
            return { ...photo, image: newImageUrl };
          } else {
            return photo;
          }
        });
        newPhotos.sort((a: Gallery, b: Gallery) => a.position - b.position);
        setPhotos(newPhotos);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  let user;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
  }
  if (user != "admin") {
    notFound();
  } else {
    return (
      <div className="grid min-h-screen w-full grid-cols-[260px_1fr] bg-gray-100 dark:bg-gray-950">
        <div className="flex flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-950">
          <header className="flex h-16 items-center justify-between border-b px-6 dark:border-gray-800">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <span className="text-lg">Admin Dashboard</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://storage.googleapis.com/staff-app-425105.appspot.com/staff/Uploads/20230921061707290755_Renuka_R_Kajur_1.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=staff-app-425105%40appspot.gserviceaccount.com%2F20240608%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240608T064306Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=6a204b8ef57efabc72acb403e39e45bade8d7f5c0e0485c193257b4d2aa119f64f664d77a80f4e51904d84169338f8e0b7d6f7d1351b561def3d09a30bf6f0459bbc0098e77ba9fc83f9244b7b5c739a997141fe7591091243602960d86411ce774e2688275f03abfcf82d22ddcd18d4848a17099b69a714a06a2cd4dff1c8e9d69aa9e18eea8de1bc8d8b9b56f409b05b2f1edc2cff0698003bd335ce8cd134cede812b68ac8cc6d86a44d2f30468a9bb09e0752b858f2db69e2015063e824a597f48b5e86e5282932c9db64730c12e7bdd66e3a622790de160e5d5c69acdd313aaa19553c543ef56c4e20de41188e669b99a334411d74087748224d616be18" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <nav className="flex-1 overflow-auto py-4">
            <ul className="grid gap-1 px-4">
              {tabsData.map((tab) => (
                <li key={tab.id}>
                  <Button
                    variant={activeTab === tab.id ? "outline" : "ghost"}
                    className="w-full justify-start gap-2 rounded-md px-3 py-2 text-base font-medium"
                    onClick={() => {
                      setActiveTab(tab.id);
                      router.push(`/admin/${tab.id}`);
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <main className="flex flex-col">
          <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-950">
            <h1 className="text-xl font-semibold">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <Button
              size="sm"
              onClick={() => {
                router.push("/admin/gallery/create");
              }}
            >
              <PlusSquare className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </header>
          <div className="flex-1 overflow-auto p-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 gap-4">
                {photos.map((photo, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-col gap-1">
                      <CardTitle className="text-xl">{photo.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm/relaxed">
                      <div className="flex justify-between">
                        <Image
                          className="h-auto max-w-full rounded-lg"
                          src={photo.image}
                          alt={photo.title}
                          width={450}
                          height={250}
                        />
                        <div className="flex">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              router.push(`/admin/gallery/update/${photo._id}`);
                            }}
                          >
                            <Pencil className="h-6 w-6" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(photo._id)}
                          >
                            <Trash2 className="h-6 w-6" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}