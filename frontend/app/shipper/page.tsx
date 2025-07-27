"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Package,
  Search,
  MapPin,
  MessageSquare,
  Calculator,
  Clock,
  Users,
  Bell,
  Menu,
  TrendingUp,
  FileText,
  Truck,
} from "lucide-react"
import JobSearchComponent from "@/components/job-search"
import PricingComponent from "@/components/pricing"
import MapComponent from "@/components/map"
import CommunicationComponent from "@/components/communication"
import CarrierSearchComponent from "@/components/carrier-search"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function ShipperApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const shipperDashboardStats = [
    {
      title: "配送依頼中",
      value: "5件",
      icon: Package,
      status: "active",
      description: "現在募集中",
    },
    {
      title: "配送完了",
      value: "12件",
      icon: Truck,
      status: "completed",
      description: "今月の実績",
    },
    {
      title: "今月の配送費",
      value: "¥125,000",
      icon: Calculator,
      status: "normal",
      description: "予算内で運用",
    },
    {
      title: "利用事業者数",
      value: "7社",
      icon: Users,
      status: "good",
      description: "信頼できるパートナー",
    },
  ]

  const shipperRecentOrders = [
    {
      id: 1,
      title: "書類配送依頼",
      route: "松山市→今治市",
      price: "¥8,500",
      time: "2時間前",
      status: "配送中",
      carrier: "松山運送",
      estimatedDelivery: "15:30",
    },
    {
      id: 2,
      title: "機材運搬依頼",
      route: "新居浜市→西条市",
      price: "¥15,000",
      time: "4時間前",
      status: "完了",
      carrier: "新居浜物流",
      estimatedDelivery: "完了済み",
    },
    {
      id: 3,
      title: "商品配送依頼",
      route: "松山市→大洲市",
      price: "¥6,800",
      time: "1日前",
      status: "見積待ち",
      carrier: "募集中",
      estimatedDelivery: "未定",
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
        <Package className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">配送依頼管理</span>
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
        <span className="truncate">料金見積依頼</span>
      </Button>
      <Button
        variant={activeTab === "carrier-search" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("carrier-search")
          onItemClick?.()
        }}
      >
        <Search className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">事業者検索</span>
      </Button>
      <Button
        variant={activeTab === "tracking" ? "default" : "ghost"}
        className="w-full justify-start text-sm"
        onClick={() => {
          setActiveTab("tracking")
          onItemClick?.()
        }}
      >
        <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">配送履歴</span>
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
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">赤帽プラットフォーム</h1>
              <p className="text-xs sm:text-sm text-gray-500 truncate">荷主向け配送依頼システム</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Bell className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden md:inline">通知</span>
            </Button>
            <Button variant="outline" size="sm" className="sm:hidden">
              <Bell className="w-4 h-4" />
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold">荷主メニュー</span>
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
                <p className="text-sm sm:text-base text-gray-600">荷主向けダッシュボード - 配送依頼の管理と状況確認</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {shipperDashboardStats.map((stat, index) => (
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
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                      配送依頼状況
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {shipperRecentOrders.map((order) => (
                        <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {order.title} ({order.route})
                              </p>
                              <Badge
                                variant="outline"
                                className={`text-xs flex-shrink-0 ${
                                  order.status === "配送中"
                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                    : order.status === "完了"
                                      ? "bg-green-100 text-green-700 border-green-200"
                                      : "bg-yellow-100 text-yellow-700 border-yellow-200"
                                }`}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600 text-sm sm:text-base">{order.price}</p>
                              <p className="text-xs text-gray-500">{order.time}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:flex sm:items-center sm:space-x-4 text-xs text-gray-500 gap-1">
                            <span className="truncate">事業者: {order.carrier}</span>
                            <span className="truncate">配送予定: {order.estimatedDelivery}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" onClick={() => setActiveTab("job-search")}>
                      配送依頼を管理
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                      配送状況
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">書類配送</p>
                          <p className="text-xs text-gray-600 truncate">松山市→今治市（松山運送）</p>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700 ml-2 flex-shrink-0">
                          配送中
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">機材運搬</p>
                          <p className="text-xs text-gray-600 truncate">新居浜市→西条市（新居浜物流）</p>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-700 ml-2 flex-shrink-0">
                          完了
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">商品配送</p>
                          <p className="text-xs text-gray-600 truncate">松山市→大洲市（見積待ち）</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-700 ml-2 flex-shrink-0">
                          見積待ち
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "job-search" && <JobSearchComponent userType="shipper" />}
          {activeTab === "pricing" && <PricingComponent userType="shipper" />}
          {activeTab === "map" && <MapComponent />}
          {activeTab === "communication" && <CommunicationComponent userType="shipper" />}
          {activeTab === "carrier-search" && <CarrierSearchComponent userType="shipper" />}
          {activeTab === "tracking" && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">配送履歴</h2>
                <p className="text-sm sm:text-base text-gray-600">過去の配送依頼履歴と詳細を確認できます</p>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-500 text-center">配送履歴機能は開発中です</p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
