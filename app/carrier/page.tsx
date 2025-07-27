"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Truck,
  Search,
  MapPin,
  MessageSquare,
  Calculator,
  Clock,
  Users,
  Settings,
  Bell,
  Menu,
  TrendingUp,
  Package,
  FileText,
} from "lucide-react"
import JobSearchComponent from "@/components/job-search"
import PricingComponent from "@/components/pricing"
import MapComponent from "@/components/map"
import CommunicationComponent from "@/components/communication"
import CarrierSearchComponent from "@/components/carrier-search"
import DriverRegistrationComponent from "@/components/driver-registration"
import VehicleManagement from "@/components/vehicle-management"
import DeliveryReport from "@/components/delivery-report"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function CarrierApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const carrierDashboardStats = [
    {
      title: "新着求車案件",
      value: "8件",
      icon: Search,
      status: "new",
      description: "今日の新規案件",
    },
    {
      title: "進行中の配送",
      value: "3件",
      icon: Truck,
      status: "active",
      description: "現在対応中",
    },
    {
      title: "今月の売上",
      value: "¥485,000",
      icon: Calculator,
      status: "good",
      description: "前月比 +12%",
    },
    {
      title: "評価スコア",
      value: "4.8",
      icon: Users,
      status: "excellent",
      description: "5.0満点中",
    },
  ]

  const carrierRecentJobs = [
    {
      id: 1,
      title: "松山市→今治市 みかん配送",
      distance: "42.3km",
      price: "¥12,500",
      time: "30分前",
      urgent: true,
      pickupTime: "14:30",
      deliveryTime: "15:45",
      status: "応募可能",
    },
    {
      id: 2,
      title: "新居浜市→四国中央市 化学製品配送",
      distance: "28.7km",
      price: "¥9,800",
      time: "1時間前",
      urgent: false,
      pickupTime: "16:00",
      deliveryTime: "17:00",
      status: "応募可能",
    },
    {
      id: 3,
      title: "宇和島市→松山市 水産物配送",
      distance: "85.2km",
      price: "¥18,000",
      time: "2時間前",
      urgent: false,
      pickupTime: "18:00",
      deliveryTime: "19:45",
      status: "応募可能",
    },
  ]

  const NavigationMenu = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="space-y-1">
      <Button
        variant={activeTab === "dashboard" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("dashboard")
          onItemClick?.()
        }}
      >
        <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">ダッシュボード</span>
      </Button>
      <Button
        variant={activeTab === "job-search" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("job-search")
          onItemClick?.()
        }}
      >
        <Search className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">求車案件検索</span>
      </Button>
      <Button
        variant={activeTab === "pricing" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("pricing")
          onItemClick?.()
        }}
      >
        <Calculator className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">料金見積提示</span>
      </Button>
      <Button
        variant={activeTab === "vehicle-management" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("vehicle-management")
          onItemClick?.()
        }}
      >
        <Package className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">車両・備品管理</span>
      </Button>
      <Button
        variant={activeTab === "carrier-search" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("carrier-search")
          onItemClick?.()
        }}
      >
        <Users className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">事業者連携</span>
      </Button>
      <Button
        variant={activeTab === "map" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("map")
          onItemClick?.()
        }}
      >
        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">地図・位置情報</span>
      </Button>
      <Button
        variant={activeTab === "communication" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("communication")
          onItemClick?.()
        }}
      >
        <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">メッセージ</span>
      </Button>
      <Button
        variant={activeTab === "registration" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("registration")
          onItemClick?.()
        }}
      >
        <Settings className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">事業者情報管理</span>
      </Button>
      <Button
        variant={activeTab === "delivery-report" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("delivery-report")
          onItemClick?.()
        }}
      >
        <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">作業完了報告</span>
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Truck className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">赤帽プラットフォーム</h1>
              <p className="text-xs sm:text-sm text-gray-500 truncate">事業者向け配送マッチングシステム</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              <Bell className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden md:inline">通知</span>
            </Button>
            <Button variant="outline" size="sm" className="sm:hidden bg-transparent">
              <Bell className="w-4 h-4" />
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold">事業者メニュー</span>
                  </div>
                  <NavigationMenu onItemClick={() => setMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen p-4">
          <NavigationMenu />
        </nav>

        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">ダッシュボード</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  赤帽事業者向けダッシュボード - 求車案件の管理と収益確認
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {carrierDashboardStats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6 pt-0">
                      <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-gray-500 mt-1 truncate">{stat.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                      新着求車案件
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {carrierRecentJobs.map((job) => (
                        <div key={job.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{job.title}</p>
                              {job.urgent && (
                                <Badge
                                  variant="outline"
                                  className="bg-red-100 text-red-700 border-red-200 text-xs flex-shrink-0"
                                >
                                  緊急
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600 text-sm sm:text-base">{job.price}</p>
                              <p className="text-xs text-gray-500">{job.time}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:flex sm:items-center sm:space-x-4 text-xs text-gray-500 gap-1">
                            <span className="truncate">{job.distance}</span>
                            <span className="truncate">集荷: {job.pickupTime}</span>
                            <span className="truncate">配送: {job.deliveryTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" onClick={() => setActiveTab("job-search")}>
                      すべての案件を見る
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                      今日の配送予定
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">14:30 - 集荷</p>
                          <p className="text-xs text-gray-600 truncate">松山市久米窪田町1-1（みかん配送）</p>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700 ml-2 flex-shrink-0">
                          進行中
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">16:00 - 集荷予定</p>
                          <p className="text-xs text-gray-600 truncate">新居浜市一宮町1-1-1（化学製品）</p>
                        </div>
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 ml-2 flex-shrink-0">
                          予定
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">18:00 - 集荷予定</p>
                          <p className="text-xs text-gray-600 truncate">宇和島市弁天町1-1-1（水産物）</p>
                        </div>
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 ml-2 flex-shrink-0">
                          予定
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "job-search" && <JobSearchComponent userType="carrier" />}
          {activeTab === "pricing" && <PricingComponent userType="carrier" />}
          {activeTab === "vehicle-management" && <VehicleManagement />}
          {activeTab === "map" && <MapComponent />}
          {activeTab === "communication" && <CommunicationComponent userType="carrier" />}
          {activeTab === "carrier-search" && <CarrierSearchComponent userType="carrier" />}
          {activeTab === "registration" && <DriverRegistrationComponent />}
          {activeTab === "delivery-report" && <DeliveryReport userType="carrier" />}
        </main>
      </div>
    </div>
  )
}
