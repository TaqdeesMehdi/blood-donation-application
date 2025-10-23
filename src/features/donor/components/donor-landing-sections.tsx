"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Shield,
  Users,
  CheckCircle,
  FileCheck,
  Clock,
  MapPin,
} from "lucide-react";

export const DonorLandingSections = () => {
  const hospitals = [
    { name: "Nishtar Hospital", image: "/nishtar-hospital.jpg" },
    { name: "City Hospital", image: "/city-hospital.jpg" },
    {
      name: "Mukhtar A. Sheikh Hospital",
      image: "/mukhtar-a-sheikh-hospital.jpg",
    },
    { name: "Shabaz Sharif Hospital", image: "/shabaz-sharif-hospital.jpg" },
  ];

  const verificationSteps = [
    {
      icon: FileCheck,
      title: "Blood Report Upload",
      description: "Donors upload their medical blood reports for verification",
      color: "text-red-500",
    },
    {
      icon: Shield,
      title: "Medical Verification",
      description:
        "Our team verifies authenticity and accuracy of submitted reports",
      color: "text-blue-500",
    },
    {
      icon: CheckCircle,
      title: "Approval & Matching",
      description:
        "Verified donors are matched with recipients based on blood type",
      color: "text-green-500",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description:
        "Get instant notifications when you're matched with a recipient",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50">
      {/* Section 1: How Our Application Helps */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2">
              Save Lives Together
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-pink-600 to-red-500 bg-clip-text text-transparent">
              Transform Lives Through Blood Donation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Join our mission to connect verified blood donors with those in
              critical need. Every donation saves lives, and we make the process
              safe, verified, and seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-red-300 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">
                  Easy Donation Process
                </CardTitle>
                <CardDescription className="text-base">
                  Streamlined process from registration to donation, making it
                  simple to save lives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Quick profile setup with essential information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Real-time matching with recipients in need
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Instant notifications and updates
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-red-300 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Verified & Safe</CardTitle>
                <CardDescription className="text-base">
                  Every donor is medically verified to ensure safety for both
                  donors and recipients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Medical report verification by professionals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Blood type accuracy confirmation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Health screening and eligibility checks
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-red-300 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Community Impact</CardTitle>
                <CardDescription className="text-base">
                  Be part of a growing community of heroes saving lives across
                  Multan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Connect with recipients directly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Track your donation impact and history
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Join a network of verified donors
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2: Partner Hospitals in Multan */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2">
              Trusted Partners
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Partner Hospitals in Multan
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We collaborate with leading hospitals across Multan to ensure
              seamless blood donation and transfusion services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hospitals.map((hospital, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 hover:border-red-200"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={hospital.image}
                    alt={hospital.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-red-400" />
                      <Badge className="bg-red-500 text-white">
                        Partner Hospital
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {hospital.name}
                    </h3>
                    <p className="text-gray-200 mt-2">Multan, Punjab</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">Verified</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-gray-600">
                          Active Partner
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Verification Process */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
              Security First
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              How We Verify Donors
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our rigorous verification process ensures every donor is medically
              cleared and safe to donate, protecting both donors and recipients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {verificationSteps.map((step, index) => (
              <Card
                key={index}
                className="border-2 hover:border-red-200 transition-all hover:shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-bl-full opacity-50" />
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  <div className="text-sm font-bold text-gray-400 mb-2">
                    STEP {index + 1}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-600" />
                Why Verification Matters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Safety Guaranteed
                  </h4>
                  <p className="text-gray-600">
                    Medical verification ensures all donors are healthy and
                    eligible to donate, preventing health risks for both
                    parties.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Accurate Matching
                  </h4>
                  <p className="text-gray-600">
                    Verified blood type information ensures recipients get
                    exactly what they need without compatibility issues.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Trust & Transparency
                  </h4>
                  <p className="text-gray-600">
                    Our verification builds trust in the community, encouraging
                    more people to participate in saving lives.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6 text-lg">
              Ready to become a verified donor and start saving lives?
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 via-pink-600 to-red-500 hover:from-red-700 hover:via-pink-700 hover:to-red-600 text-white px-12"
            >
              Start Verification Process
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
