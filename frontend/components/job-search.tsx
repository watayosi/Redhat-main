"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Clock, AlertTriangle, Plus, Filter, Package } from "lucide-react"

interface JobSearchProps {
  userType: "carrier" | "shipper"
}

export default function JobSearchComponent({ userType }: JobSearchProps) {
  // jobsのサンプルデータを愛媛県版に更新
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "みかん配送（緊急）",
      pickup: "松山市久米窪田町1-1",
      delivery: "今治市常盤町1-1-1",
      distance: "42.3km",
      estimatedTime: "55分",
      price: "¥12,500",
      pickupTime: "14:30",
      deliveryTime: "15:45",
      cargoType: "農産物（みかん）",
      weight: "150kg",
      urgent: true,
      vehicleType: "軽トラック",
      requirements: "午後4時までに市場へ必着、丁寧な取り扱い必須",
      shipper: "愛媛みかん農協",
      contact: "089-1234-5678",
      posted: "30分前",
    },
    {
      id: 2,
      title: "造船部品配送",
      pickup: "新居浜市一宮町1-1-1",
      delivery: "今治市片原町1-1-1",
      distance: "28.7km",
      estimatedTime: "40分",
      price: "¥18,000",
      pickupTime: "16:00",
      deliveryTime: "17:00",
      cargoType: "機械部品",
      weight: "80kg",
      urgent: false,
      vehicleType: "軽バン",
      requirements: "精密部品のため振動注意、雨濡れ厳禁",
      shipper: "今治造船協力会",
      contact: "0897-9876-5432",
      posted: "1時間前",
    },
    {
      id: 3,
      title: "冷凍水産物配送",
      pickup: "宇和島市弁天町1-1-1",
      delivery: "松山市大手町1-1-1",
      distance: "85.2km",
      estimatedTime: "1時間30分",
      price: "¥25,000",
      pickupTime: "18:00",
      deliveryTime: "19:45",
      cargoType: "冷凍水産物",
      weight: "200kg",
      urgent: false,
      vehicleType: "冷凍車",
      requirements: "-18℃以下で配送、真珠養殖関連商品",
      shipper: "宇和海水産",
      contact: "0895-5555-1234",
      posted: "2時間前",
    },
  ])

  const [showJobForm, setShowJobForm] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    area: "",
    vehicleType: "",
    priceMin: "",
    priceMax: "",
    urgent: false,
  })

  const vehicleTypes = ["軽トラック", "軽バン", "ホロ車", "冷蔵車", "冷凍車", "パワーゲート付き"]

  // serviceAreasを愛媛県の市町村に更新
  const serviceAreas = [
    "松山市",
    "今治市",
    "新居浜市",
    "西条市",
    "大洲市",
    "伊予市",
    "四国中央市",
    "宇和島市",
    "八幡浜市",
    "東温市",
    "上島町",
    "久万高原町",
    "松前町",
    "砥部町",
    "内子町",
    "伊方町",
    "松野町",
    "鬼北町",
    "愛南町",
  ]

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {userType === "carrier" ? "求車案件検索" : "配送依頼管理"}
          </h2>
          <p className="text-gray-600">
            {userType === "carrier" ? "配送案件を検索して受注できます" : "配送依頼を投稿・管理できます"}
          </p>
        </div>
        {userType === "shipper" && (
          <Button onClick={() => setShowJobForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            新規配送依頼
          </Button>
        )}
      </div>

      {/* 検索・フィルター */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            検索・フィルター
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="area">エリア</Label>
              <Input
                id="area"
                placeholder="松山市、今治市..."
                value={searchFilters.area}
                onChange={(e) => setSearchFilters({ ...searchFilters, area: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="vehicle-type">車両タイプ</Label>
              <Select
                value={searchFilters.vehicleType}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, vehicleType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="車両タイプを選択" />
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
              <Label htmlFor="price-range">料金範囲</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="最低"
                  value={searchFilters.priceMin}
                  onChange={(e) => setSearchFilters({ ...searchFilters, priceMin: e.target.value })}
                />
                <Input
                  placeholder="最高"
                  value={searchFilters.priceMax}
                  onChange={(e) => setSearchFilters({ ...searchFilters, priceMax: e.target.value })}
                />
              </div>
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

      {/* 案件一覧 */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className={`border-l-4 ${job.urgent ? "border-l-red-500" : "border-l-blue-500"}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  {job.urgent && (
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      緊急
                    </Badge>
                  )}
                  <Badge variant="outline" className={getVehicleTypeColor(job.vehicleType)}>
                    {job.vehicleType}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{job.price}</p>
                  <p className="text-sm text-gray-500">{job.posted}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-green-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium">集荷先</p>
                      <p className="text-sm text-gray-600">{job.pickup}</p>
                      <p className="text-xs text-blue-600">集荷時間: {job.pickupTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-red-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium">配送先</p>
                      <p className="text-sm text-gray-600">{job.delivery}</p>
                      <p className="text-xs text-blue-600">配送時間: {job.deliveryTime}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">距離:</span>
                      <span className="font-medium ml-2">{job.distance}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">所要時間:</span>
                      <span className="font-medium ml-2">{job.estimatedTime}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">荷物:</span>
                      <span className="font-medium ml-2">{job.cargoType}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">重量:</span>
                      <span className="font-medium ml-2">{job.weight}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">荷主: {job.shipper}</p>
                    <p className="text-sm text-gray-600">連絡先: {job.contact}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">特記事項・要求事項</p>
                <p className="text-sm text-gray-600">{job.requirements}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>予想配送時間: {job.estimatedTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-1" />
                    <span>
                      {job.cargoType} ({job.weight})
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    詳細確認
                  </Button>
                  {userType === "carrier" ? (
                    <Button size="sm">応募する</Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      編集
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 新規配送依頼フォーム（荷主用） */}
      {showJobForm && userType === "shipper" && (
        <Card>
          <CardHeader>
            <CardTitle>新規配送依頼</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="job-title">案件タイトル</Label>
                <Input id="job-title" placeholder="例: 書類配送（緊急）" />
              </div>
              <div>
                <Label htmlFor="cargo-type">荷物種類</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="荷物種類を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="documents">書類</SelectItem>
                    <SelectItem value="small-package">小荷物</SelectItem>
                    <SelectItem value="furniture">家具</SelectItem>
                    <SelectItem value="food">食品</SelectItem>
                    <SelectItem value="frozen">冷凍食品</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pickup-address">集荷先住所</Label>
                <Input id="pickup-address" placeholder="集荷先の住所を入力" />
              </div>
              <div>
                <Label htmlFor="delivery-address">配送先住所</Label>
                <Input id="delivery-address" placeholder="配送先の住所を入力" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="pickup-time">集荷希望時間</Label>
                <Input id="pickup-time" type="datetime-local" />
              </div>
              <div>
                <Label htmlFor="delivery-time">配送希望時間</Label>
                <Input id="delivery-time" type="datetime-local" />
              </div>
              <div>
                <Label htmlFor="vehicle-required">必要車両</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="車両タイプ" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">重量（kg）</Label>
                <Input id="weight" type="number" placeholder="重量を入力" />
              </div>
              <div>
                <Label htmlFor="budget">予算</Label>
                <Input id="budget" placeholder="¥8,000" />
              </div>
            </div>

            <div>
              <Label htmlFor="requirements">特記事項・要求事項</Label>
              <Textarea id="requirements" placeholder="配送時の注意点や特別な要求があれば記入してください" />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowJobForm(false)}>
                キャンセル
              </Button>
              <Button onClick={() => setShowJobForm(false)}>配送依頼を投稿</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
