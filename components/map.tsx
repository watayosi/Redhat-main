"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Navigation, Truck, Clock, Route, Locate, Search, RefreshCw } from "lucide-react"

export default function MapComponent() {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number
    lng: number
    address: string
  } | null>(null)

  // nearbyJobsを愛媛県版に更新
  const [nearbyJobs, setNearbyJobs] = useState([
    {
      id: 1,
      title: "書類配送",
      pickup: "松山市二番町3-7-12",
      delivery: "松山市湊町4-4-7",
      distance: "3.2km",
      price: "¥6,500",
      urgent: true,
      estimatedTime: "15分",
    },
    {
      id: 2,
      title: "みかん配送",
      pickup: "松山市久米窪田町888",
      delivery: "今治市常盤町1-5-1",
      distance: "42.8km",
      price: "¥12,800",
      urgent: false,
      estimatedTime: "55分",
    },
    {
      id: 3,
      title: "化学製品配送",
      pickup: "新居浜市一宮町1-5-1",
      delivery: "四国中央市三島中央5-6-10",
      distance: "28.5km",
      price: "¥15,000",
      urgent: false,
      estimatedTime: "45分",
    },
  ])

  // activeDeliveriesを愛媛県版に更新
  const [activeDeliveries, setActiveDeliveries] = useState([
    {
      id: 1,
      title: "進行中の配送",
      currentLocation: "松山市空港通1-1-1",
      destination: "今治市片原町1-5-8",
      progress: 65,
      estimatedArrival: "15:30",
      status: "配送中",
    },
  ])

  const [searchRadius, setSearchRadius] = useState("5")

  // 現在位置を取得（実際のアプリではGeolocation APIを使用）
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "愛媛県松山市一番町4-4-2", // 実際はReverse Geocodingで取得
          })
        },
        (error) => {
          console.error("位置情報の取得に失敗しました:", error)
          // デモ用のデフォルト位置
          // currentLocationのデフォルト位置を松山市に変更
          setCurrentLocation({
            lat: 33.8416,
            lng: 132.7656,
            address: "愛媛県松山市一番町4-4-2",
          })
        },
      )
    } else {
      // デモ用のデフォルト位置
      // currentLocationのデフォルト位置を松山市に変更
      setCurrentLocation({
        lat: 33.8416,
        lng: 132.7656,
        address: "愛媛県松山市一番町4-4-2",
      })
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">地図・位置情報</h2>
        <p className="text-gray-600">GPS機能を活用した配送管理と案件検索</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 地図表示エリア */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  配送マップ
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={getCurrentLocation}>
                    <Locate className="w-4 h-4 mr-1" />
                    現在位置
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    更新
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 実際のアプリではGoogle Maps APIやMapbox等を使用 */}
              <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">インタラクティブマップ</p>
                  <p className="text-sm text-gray-500">実際のアプリではGoogle Maps APIを統合</p>
                </div>

                {/* 現在位置表示 */}
                {currentLocation && (
                  <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">現在位置</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{currentLocation.address}</p>
                  </div>
                )}

                {/* 案件マーカー（デモ用） */}
                <div className="absolute top-20 right-20 bg-red-600 text-white p-2 rounded-full">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="absolute bottom-20 left-20 bg-green-600 text-white p-2 rounded-full">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 進行中の配送 */}
          {activeDeliveries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Route className="w-5 h-5 mr-2" />
                  進行中の配送
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeDeliveries.map((delivery) => (
                    <div key={delivery.id} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{delivery.title}</h4>
                        <Badge className="bg-blue-100 text-blue-700">{delivery.status}</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>現在地: {delivery.currentLocation}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Navigation className="w-4 h-4 text-red-600" />
                          <span>目的地: {delivery.destination}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span>到着予定: {delivery.estimatedArrival}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>進捗</span>
                          <span>{delivery.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${delivery.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          ルート確認
                        </Button>
                        <Button size="sm" variant="outline">
                          顧客連絡
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* サイドパネル */}
        <div className="space-y-4">
          {/* 現在位置情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Locate className="w-5 h-5 mr-2" />
                現在位置
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentLocation ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{currentLocation.address}</p>
                  <p className="text-xs text-gray-500">緯度: {currentLocation.lat.toFixed(6)}</p>
                  <p className="text-xs text-gray-500">経度: {currentLocation.lng.toFixed(6)}</p>
                  <Button size="sm" className="w-full mt-2">
                    位置を更新
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">位置情報を取得中...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 検索設定 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                案件検索設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium">検索半径</label>
                <Select value={searchRadius} onValueChange={setSearchRadius}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1km以内</SelectItem>
                    <SelectItem value="3">3km以内</SelectItem>
                    <SelectItem value="5">5km以内</SelectItem>
                    <SelectItem value="10">10km以内</SelectItem>
                    <SelectItem value="20">20km以内</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                周辺案件を検索
              </Button>
            </CardContent>
          </Card>

          {/* 近くの案件 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                近くの案件
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nearbyJobs.map((job) => (
                  <div key={job.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{job.title}</h4>
                      {job.urgent && (
                        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 text-xs">
                          緊急
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>距離: {job.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>所要時間: {job.estimatedTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-green-600 text-sm">{job.price}</span>
                      <Button size="sm" variant="outline">
                        詳細
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
