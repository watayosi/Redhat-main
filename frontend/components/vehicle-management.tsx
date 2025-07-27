"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, Wrench, Fuel, AlertTriangle, CheckCircle, Calendar, Plus, Search, Key } from "lucide-react"

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      number: "A-001",
      model: "軽トラック",
      year: 2020,
      mileage: 45000,
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-04-10",
      fuelEfficiency: 18.5,
      status: "稼働中",
      maintenanceProgress: 75,
    },
    {
      id: 2,
      number: "A-002",
      model: "軽バン",
      year: 2019,
      mileage: 62000,
      lastMaintenance: "2023-12-15",
      nextMaintenance: "2024-03-15",
      fuelEfficiency: 16.2,
      status: "整備予定",
      maintenanceProgress: 90,
    },
    {
      id: 3,
      number: "A-003",
      model: "軽トラック",
      year: 2021,
      mileage: 28000,
      lastMaintenance: "2024-01-20",
      nextMaintenance: "2024-04-20",
      fuelEfficiency: 19.1,
      status: "稼働中",
      maintenanceProgress: 45,
    },
  ])

  const [supplies, setSupplies] = useState([
    {
      id: 1,
      name: "エンジンオイル",
      currentStock: 8,
      minStock: 5,
      unit: "L",
      lastReplenished: "2024-01-15",
      status: "充分",
    },
    {
      id: 2,
      name: "タイヤ",
      currentStock: 2,
      minStock: 4,
      unit: "本",
      lastReplenished: "2023-12-20",
      status: "不足",
    },
    {
      id: 3,
      name: "ワイパーブレード",
      currentStock: 6,
      minStock: 4,
      unit: "個",
      lastReplenished: "2024-01-10",
      status: "充分",
    },
  ])

  const [activeTab, setActiveTab] = useState("vehicles")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "稼働中":
        return "bg-green-100 text-green-700"
      case "整備予定":
        return "bg-yellow-100 text-yellow-700"
      case "整備中":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSupplyStatusColor = (status: string) => {
    switch (status) {
      case "充分":
        return "bg-green-100 text-green-700"
      case "不足":
        return "bg-red-100 text-red-700"
      case "要発注":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const totalVehicles = vehicles.length
  const activeVehicles = vehicles.filter((v) => v.status === "稼働中").length
  const maintenanceDue = vehicles.filter((v) => v.maintenanceProgress >= 80).length
  const averageFuelEfficiency = vehicles.reduce((sum, v) => sum + v.fuelEfficiency, 0) / vehicles.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">車両・備品管理</h2>
          <p className="text-gray-600">車両状況と備品在庫の一元管理</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Key className="w-4 h-4 mr-2" />
            備品チェック
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            車両追加
          </Button>
        </div>
      </div>

      {/* AI機能カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-800">AI予測整備管理</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-blue-700 mb-3">走行距離から整備時期を予測</p>
            <Button size="sm" variant="outline" className="bg-white text-blue-700 border-blue-300">
              予測実行
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-800">自動補充リマインダー</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-green-700 mb-3">消耗品の補充タイミングを通知</p>
            <Button size="sm" variant="outline" className="bg-white text-green-700 border-green-300">
              設定管理
            </Button>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-yellow-800">故障予兆分析</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-yellow-700 mb-3">過去データから故障パターンを分析</p>
            <Button size="sm" variant="outline" className="bg-white text-yellow-700 border-yellow-300">
              分析開始
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 車両統計サマリー */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">総車両数</CardTitle>
            <Truck className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVehicles}台</div>
            <p className="text-xs text-gray-500 mt-1">稼働中 {activeVehicles}台</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">整備予定</CardTitle>
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{maintenanceDue}台</div>
            <p className="text-xs text-gray-500 mt-1">要注意車両</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">平均燃費</CardTitle>
            <Fuel className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageFuelEfficiency.toFixed(1)}km/L</div>
            <p className="text-xs text-gray-500 mt-1">前月比 +0.8km/L</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">稼働率</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-gray-500 mt-1">目標達成</p>
          </CardContent>
        </Card>
      </div>

      {/* タブ切り替え */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "vehicles" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("vehicles")}
        >
          車両管理
        </Button>
        <Button
          variant={activeTab === "supplies" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("supplies")}
        >
          備品管理
        </Button>
      </div>

      {activeTab === "vehicles" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">車両一覧</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input placeholder="車両番号、車種で検索..." />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="状態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  <SelectItem value="active">稼働中</SelectItem>
                  <SelectItem value="maintenance">整備予定</SelectItem>
                  <SelectItem value="repair">整備中</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-lg">{vehicle.number}</span>
                        <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                        {vehicle.maintenanceProgress >= 80 && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            整備時期
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Wrench className="w-4 h-4 mr-1" />
                          整備記録
                        </Button>
                        <Button variant="outline" size="sm">
                          詳細
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">車種:</span>
                          <span className="font-medium">{vehicle.model}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">年式:</span>
                          <span className="font-medium">{vehicle.year}年</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">走行距離:</span>
                          <span className="font-medium">{vehicle.mileage.toLocaleString()}km</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">前回整備:</span>
                          <span className="font-medium">{vehicle.lastMaintenance}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">次回整備:</span>
                          <span className={`font-medium ${vehicle.maintenanceProgress >= 80 ? "text-yellow-600" : ""}`}>
                            {vehicle.nextMaintenance}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">燃費:</span>
                          <span className="font-medium">{vehicle.fuelEfficiency}km/L</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-gray-600">整備進捗</span>
                          <div className="mt-1">
                            <Progress value={vehicle.maintenanceProgress} className="h-2" />
                            <span className="text-xs text-gray-500 mt-1">{vehicle.maintenanceProgress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {vehicle.maintenanceProgress >= 80 && (
                      <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center text-yellow-700">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">整備時期が近づいています - 予約をお勧めします</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "supplies" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">備品在庫管理</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input placeholder="備品名で検索..." />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="状態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  <SelectItem value="sufficient">充分</SelectItem>
                  <SelectItem value="low">不足</SelectItem>
                  <SelectItem value="order">要発注</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplies.map((supply) => (
                <Card key={supply.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-lg">{supply.name}</span>
                        <Badge className={getSupplyStatusColor(supply.status)}>{supply.status}</Badge>
                        {supply.status === "不足" && (
                          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            要補充
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          補充記録
                        </Button>
                        <Button variant="outline" size="sm">
                          編集
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">現在在庫:</span>
                          <span
                            className={`font-medium ${supply.currentStock <= supply.minStock ? "text-red-600" : ""}`}
                          >
                            {supply.currentStock} {supply.unit}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">最小在庫:</span>
                          <span className="font-medium">
                            {supply.minStock} {supply.unit}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">最終補充:</span>
                          <span className="font-medium">{supply.lastReplenished}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-gray-600">在庫レベル</span>
                          <div className="mt-1">
                            <Progress value={(supply.currentStock / (supply.minStock * 2)) * 100} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {supply.status === "不足" && (
                      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center justify-between text-red-700">
                          <div className="flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">在庫不足 - 補充が必要です</span>
                          </div>
                          <Button size="sm" variant="outline" className="bg-white text-red-700 border-red-300">
                            発注手配
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
