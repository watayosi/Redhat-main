"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Truck, Phone, Mail, Filter, Clock, Thermometer, Package } from "lucide-react"

interface CarrierSearchProps {
  userType: "carrier" | "shipper"
}

export default function CarrierSearchComponent({ userType }: CarrierSearchProps) {
  // carriersのサンプルデータを愛媛県版に更新
  const [carriers, setCarriers] = useState([
    {
      id: 1,
      name: "松山運送",
      businessName: "松山運送株式会社",
      rating: 4.8,
      reviewCount: 156,
      location: "愛媛県松山市",
      distance: "2.3km",
      vehicleTypes: ["軽トラック", "軽バン"],
      specialties: ["書類配送", "農産物配送"],
      priceRange: "¥3,000-¥15,000",
      responseTime: "平均15分",
      completedJobs: 1250,
      avatar: "/placeholder.svg?height=60&width=60",
      phone: "089-1234-5678",
      email: "matsuyama@example.com",
      features: ["みかん配送専門", "即日配送"],
      workingHours: "8:00-20:00",
      paymentMethods: ["現金", "銀行振込", "クレジット"],
      insuranceAmount: "¥10,000,000",
    },
    {
      id: 2,
      name: "今治物流",
      businessName: "今治物流サービス",
      rating: 4.6,
      reviewCount: 89,
      location: "愛媛県今治市",
      distance: "42.1km",
      vehicleTypes: ["軽トラック", "冷凍車"],
      specialties: ["造船部品", "水産物配送"],
      priceRange: "¥4,000-¥20,000",
      responseTime: "平均20分",
      completedJobs: 890,
      avatar: "/placeholder.svg?height=60&width=60",
      phone: "0898-9876-5432",
      email: "imabari@example.com",
      features: ["冷凍対応", "造船業界専門"],
      workingHours: "7:00-22:00",
      paymentMethods: ["現金", "銀行振込"],
      insuranceAmount: "¥15,000,000",
    },
    {
      id: 3,
      name: "宇和島配送",
      businessName: "宇和島配送センター",
      rating: 4.9,
      reviewCount: 203,
      location: "愛媛県宇和島市",
      distance: "85.8km",
      vehicleTypes: ["軽バン", "冷蔵車", "冷凍車"],
      specialties: ["水産物配送", "真珠関連"],
      priceRange: "¥5,000-¥25,000",
      responseTime: "平均10分",
      completedJobs: 1680,
      avatar: "/placeholder.svg?height=60&width=60",
      phone: "0895-5555-1234",
      email: "uwajima@example.com",
      features: ["水産物専門", "真珠養殖業界対応"],
      workingHours: "9:00-18:00",
      paymentMethods: ["現金", "銀行振込", "クレジット", "電子マネー"],
      insuranceAmount: "¥20,000,000",
    },
  ])

  const [searchFilters, setSearchFilters] = useState({
    area: "",
    vehicleType: "",
    specialty: "",
    priceRange: "",
    rating: "",
  })

  const vehicleTypes = ["軽トラック", "軽バン", "ホロ車", "冷蔵車", "冷凍車", "パワーゲート付き"]

  // specialtiesを愛媛県の産業に合わせて更新
  const specialties = [
    "書類配送",
    "農産物配送",
    "みかん配送",
    "造船部品配送",
    "化学製品配送",
    "水産物配送",
    "真珠関連配送",
    "製紙原料配送",
    "タオル製品配送",
    "重量物配送",
  ]

  const getVehicleTypeIcon = (type: string) => {
    switch (type) {
      case "冷凍車":
      case "冷蔵車":
        return <Thermometer className="w-3 h-3" />
      default:
        return <Truck className="w-3 h-3" />
    }
  }

  const getVehicleTypeColor = (type: string) => {
    switch (type) {
      case "冷凍車":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "冷蔵車":
        return "bg-cyan-100 text-cyan-700 border-cyan-200"
      case "ホロ車":
        return "bg-green-100 text-green-700 border-green-200"
      case "パワーゲート付き":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {userType === "shipper" ? "赤帽事業者検索" : "事業者ネットワーク"}
        </h2>
        <p className="text-gray-600">
          {userType === "shipper"
            ? "配送ニーズに最適な赤帽事業者を検索できます"
            : "他の赤帽事業者との連携とネットワーク構築"}
        </p>
      </div>

      {/* 検索・フィルター */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            検索・フィルター
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium">エリア</label>
              <Input
                placeholder="松山市、今治市..."
                value={searchFilters.area}
                onChange={(e) => setSearchFilters({ ...searchFilters, area: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">車両タイプ</label>
              <Select
                value={searchFilters.vehicleType}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, vehicleType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="車両タイプ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">専門分野</label>
              <Select
                value={searchFilters.specialty}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, specialty: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="専門分野" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">評価</label>
              <Select
                value={searchFilters.rating}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, rating: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="評価" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="4.5">4.5以上</SelectItem>
                  <SelectItem value="4.0">4.0以上</SelectItem>
                  <SelectItem value="3.5">3.5以上</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                検索
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 事業者一覧 */}
      <div className="space-y-4">
        {carriers.map((carrier) => (
          <Card key={carrier.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={carrier.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{carrier.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{carrier.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{carrier.businessName}</p>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{carrier.rating}</span>
                        <span className="text-sm text-gray-500">({carrier.reviewCount}件)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{carrier.location}</span>
                        <span>({carrier.distance})</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {carrier.vehicleTypes.map((type) => (
                        <Badge key={type} variant="outline" className={`${getVehicleTypeColor(type)} text-xs`}>
                          {getVehicleTypeIcon(type)}
                          <span className="ml-1">{type}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 text-lg">{carrier.priceRange}</p>
                  <p className="text-sm text-gray-500">料金目安</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">専門分野</h4>
                  <div className="flex flex-wrap gap-1">
                    {carrier.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        <Package className="w-3 h-3 mr-1" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">実績・対応</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>応答時間: {carrier.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="w-3 h-3 text-gray-400" />
                      <span>完了件数: {carrier.completedJobs.toLocaleString()}件</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">営業情報</h4>
                  <div className="text-sm space-y-1">
                    <p>営業時間: {carrier.workingHours}</p>
                    <p>保険金額: {carrier.insuranceAmount}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">連絡先</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span>{carrier.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span className="truncate">{carrier.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <h4 className="font-medium text-sm mb-2">特徴・サービス</h4>
                <div className="flex flex-wrap gap-2">
                  {carrier.features.map((feature) => (
                    <Badge key={feature} className="bg-blue-100 text-blue-700 text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>支払方法: {carrier.paymentMethods.join(", ")}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-1" />
                    電話
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-1" />
                    メール
                  </Button>
                  <Button size="sm">{userType === "shipper" ? "依頼する" : "連携申請"}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <p className="text-sm text-gray-600">登録事業者数</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">4.7</div>
            <p className="text-sm text-gray-600">平均評価</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">98.5%</div>
            <p className="text-sm text-gray-600">配送成功率</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">12分</div>
            <p className="text-sm text-gray-600">平均応答時間</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
