"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, MapPin, Clock, Truck, Package, AlertCircle, TrendingUp, Send, FileText } from "lucide-react"

interface PricingComponentProps {
  userType?: "carrier" | "shipper"
}

export default function PricingComponent({ userType = "carrier" }: PricingComponentProps) {
  const [pricingData, setPricingData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    cargoType: "",
    weight: "",
    dimensions: "",
    urgency: "normal",
    vehicleType: "",
    additionalServices: [] as string[],
  })

  const [estimate, setEstimate] = useState<{
    basePrice: number
    distance: string
    estimatedTime: string
    fuelCost: number
    additionalCosts: number
    totalPrice: number
    breakdown: Array<{ item: string; cost: number }>
  } | null>(null)

  // 愛媛県内の主要ルートの料金例
  const [recentQuotes, setRecentQuotes] = useState([
    {
      id: 1,
      route: "松山市 → 今治市",
      distance: "42km",
      price: "¥12,500",
      cargoType: "みかん",
      vehicleType: "軽トラック",
      date: "2024-01-15",
      status: userType === "shipper" ? "見積依頼中" : "見積提示済み",
    },
    {
      id: 2,
      route: "新居浜市 → 四国中央市",
      distance: "28km",
      price: "¥9,800",
      cargoType: "化学製品",
      vehicleType: "軽バン",
      date: "2024-01-14",
      status: userType === "shipper" ? "契約済み" : "受注済み",
    },
    {
      id: 3,
      route: "宇和島市 → 松山市",
      distance: "85km",
      price: "¥18,000",
      cargoType: "水産物",
      vehicleType: "冷蔵車",
      date: "2024-01-13",
      status: userType === "shipper" ? "完了" : "配送完了",
    },
  ])

  const cargoTypes = [
    "書類",
    "小荷物",
    "農産物（みかん）",
    "水産物",
    "造船部品",
    "化学製品",
    "タオル製品",
    "家具・家電",
    "その他",
  ]

  const vehicleTypes = ["軽トラック", "軽バン", "ホロ車", "冷蔵車", "冷凍車", "パワーゲート付き"]

  const additionalServices = ["荷物の梱包", "設置・組み立て", "階段作業", "時間指定配送", "土日祝日配送", "保険付帯"]

  const calculateEstimate = () => {
    // 簡易的な料金計算（実際のアプリではより複雑な計算を行う）
    let basePrice = 5000 // 基本料金
    const distance = "25km" // デモ用
    const estimatedTime = "35分" // デモ用
    const fuelCost = 800
    let additionalCosts = 0

    // 荷物タイプによる料金調整
    switch (pricingData.cargoType) {
      case "農産物（みかん）":
        basePrice += 2000
        break
      case "水産物":
        basePrice += 3000
        break
      case "造船部品":
        basePrice += 4000
        break
      case "化学製品":
        basePrice += 3500
        break
      default:
        break
    }

    // 車両タイプによる料金調整
    switch (pricingData.vehicleType) {
      case "冷蔵車":
        basePrice += 2000
        break
      case "冷凍車":
        basePrice += 3000
        break
      case "パワーゲート付き":
        basePrice += 1500
        break
      default:
        break
    }

    // 緊急度による料金調整
    if (pricingData.urgency === "urgent") {
      basePrice *= 1.5
    }

    // 追加サービス料金
    additionalCosts = pricingData.additionalServices.length * 1000

    const totalPrice = basePrice + fuelCost + additionalCosts

    const breakdown = [
      { item: "基本配送料", cost: basePrice },
      { item: "燃料費", cost: fuelCost },
      { item: "追加サービス", cost: additionalCosts },
    ]

    setEstimate({
      basePrice,
      distance,
      estimatedTime,
      fuelCost,
      additionalCosts,
      totalPrice,
      breakdown,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {userType === "carrier" ? "料金見積提示" : "料金見積依頼"}
        </h2>
        <p className="text-gray-600">
          {userType === "carrier"
            ? "荷主からの依頼に対して適正な料金見積もりを提示します"
            : "配送依頼の料金見積もりを複数の事業者に依頼できます"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 見積もり入力フォーム */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              {userType === "carrier" ? "見積もり作成" : "見積もり依頼"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="pickup">集荷先住所</Label>
                <Input
                  id="pickup"
                  placeholder="愛媛県松山市一番町4-4-2"
                  value={pricingData.pickupAddress}
                  onChange={(e) => setPricingData({ ...pricingData, pickupAddress: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="delivery">配送先住所</Label>
                <Input
                  id="delivery"
                  placeholder="愛媛県今治市常盤町1-5-1"
                  value={pricingData.deliveryAddress}
                  onChange={(e) => setPricingData({ ...pricingData, deliveryAddress: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cargo-type">荷物種類</Label>
                <Select
                  value={pricingData.cargoType}
                  onValueChange={(value) => setPricingData({ ...pricingData, cargoType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="荷物種類を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {cargoTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="vehicle-type">車両タイプ</Label>
                <Select
                  value={pricingData.vehicleType}
                  onValueChange={(value) => setPricingData({ ...pricingData, vehicleType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="車両タイプを選択" />
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
                <Input
                  id="weight"
                  type="number"
                  placeholder="例: 50"
                  value={pricingData.weight}
                  onChange={(e) => setPricingData({ ...pricingData, weight: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="urgency">緊急度</Label>
                <Select
                  value={pricingData.urgency}
                  onValueChange={(value) => setPricingData({ ...pricingData, urgency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">通常</SelectItem>
                    <SelectItem value="urgent">緊急</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>追加サービス</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {additionalServices.map((service) => (
                  <label key={service} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={pricingData.additionalServices.includes(service)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPricingData({
                            ...pricingData,
                            additionalServices: [...pricingData.additionalServices, service],
                          })
                        } else {
                          setPricingData({
                            ...pricingData,
                            additionalServices: pricingData.additionalServices.filter((s) => s !== service),
                          })
                        }
                      }}
                      className="rounded"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button onClick={calculateEstimate} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              {userType === "carrier" ? "見積もりを作成" : "見積もりを依頼"}
            </Button>
          </CardContent>
        </Card>

        {/* 見積もり結果 */}
        <div className="space-y-4">
          {estimate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {userType === "carrier" ? "見積もり結果" : "見積もり概算"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">{userType === "carrier" ? "提示料金" : "概算料金"}</p>
                      <p className="text-2xl font-bold text-green-600">¥{estimate.totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{estimate.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{estimate.estimatedTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">料金内訳</h4>
                    {estimate.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.item}</span>
                        <span>¥{item.cost.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    {userType === "carrier" ? (
                      <>
                        <Button className="flex-1">
                          <Send className="w-4 h-4 mr-2" />
                          見積もりを送信
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <FileText className="w-4 h-4 mr-2" />
                          PDF出力
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="flex-1">
                          <Send className="w-4 h-4 mr-2" />
                          複数社に見積依頼
                        </Button>
                        <Button variant="outline" className="flex-1">
                          保存
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 最近の見積もり履歴 */}
          <Card>
            <CardHeader>
              <CardTitle>{userType === "carrier" ? "最近の見積もり提示" : "見積もり依頼履歴"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{quote.route}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{quote.distance}</span>
                        <span>{quote.cargoType}</span>
                        <span>{quote.vehicleType}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{quote.price}</p>
                      <p className="text-xs text-gray-500">{quote.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 料金情報・ガイド */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">車両別料金</h4>
                <p className="text-sm text-gray-600">車両タイプごとの基本料金表</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">荷物別料金</h4>
                <p className="text-sm text-gray-600">荷物種類による料金差</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium">{userType === "carrier" ? "料金設定ガイド" : "料金相場ガイド"}</h4>
                <p className="text-sm text-gray-600">
                  {userType === "carrier" ? "適正料金の設定方法" : "配送料金の相場情報"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
