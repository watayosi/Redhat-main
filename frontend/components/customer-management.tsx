"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, AlertTriangle, Plus, Search, MessageSquare } from "lucide-react"

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "株式会社サンプル",
      contact: "田中太郎",
      phone: "03-1234-5678",
      email: "tanaka@sample.co.jp",
      address: "東京都新宿区西新宿1-1-1",
      lastOrder: "2024-01-15",
      totalOrders: 25,
      status: "優良",
      urgentCount: 0,
    },
    {
      id: 2,
      name: "テスト商事株式会社",
      contact: "佐藤花子",
      phone: "03-9876-5432",
      email: "sato@test.co.jp",
      address: "東京都品川区港南1-1-1",
      lastOrder: "2024-01-20",
      totalOrders: 45,
      status: "VIP",
      urgentCount: 2,
    },
  ])

  const [orders, setOrders] = useState([
    {
      id: 1,
      customerId: 1,
      date: "2024-01-20",
      pickup: "新宿区西新宿1-1-1",
      delivery: "池袋区東池袋1-1-1",
      status: "受注",
      priority: "通常",
      amount: 8500,
      notes: "午前中配送希望",
    },
    {
      id: 2,
      customerId: 2,
      date: "2024-01-20",
      pickup: "品川区港南1-1-1",
      delivery: "渋谷区道玄坂1-1-1",
      status: "緊急",
      priority: "緊急",
      amount: 12000,
      notes: "至急対応お願いします",
    },
  ])

  const [activeTab, setActiveTab] = useState("customers")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "優良":
        return "bg-green-100 text-green-700 border-green-200"
      case "新規":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "緊急":
        return "bg-red-100 text-red-700"
      case "受注":
        return "bg-blue-100 text-blue-700"
      case "配送中":
        return "bg-yellow-100 text-yellow-700"
      case "完了":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">顧客・受注管理</h2>
          <p className="text-gray-600">顧客情報と受注状況の一元管理</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            AI自動応答設定
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            新規顧客追加
          </Button>
        </div>
      </div>

      {/* AI機能カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-800">AI電話対応</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-blue-700 mb-3">よくある問い合わせを自動応答</p>
            <Button size="sm" variant="outline" className="bg-white text-blue-700 border-blue-300">
              設定管理
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-800">自動記録・要約</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-green-700 mb-3">通話内容を自動でメモ化</p>
            <Button size="sm" variant="outline" className="bg-white text-green-700 border-green-300">
              履歴確認
            </Button>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-yellow-800">緊急案件検知</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-yellow-700 mb-3">緊急案件を自動でアラート</p>
            <Button size="sm" variant="outline" className="bg-white text-yellow-700 border-yellow-300">
              アラート設定
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* タブ切り替え */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "customers" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("customers")}
        >
          顧客一覧
        </Button>
        <Button variant={activeTab === "orders" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("orders")}>
          受注管理
        </Button>
      </div>

      {activeTab === "customers" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">顧客一覧</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input placeholder="顧客名、連絡先で検索..." />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="ステータス" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="good">優良</SelectItem>
                  <SelectItem value="new">新規</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <Card key={customer.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg">{customer.name}</h3>
                        <Badge variant="outline" className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                        {customer.urgentCount > 0 && (
                          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            緊急案件 {customer.urgentCount}件
                          </Badge>
                        )}
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
                        <Button variant="outline" size="sm">
                          編集
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-600">担当者:</span>
                          <span className="font-medium">{customer.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-start space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <span>{customer.address}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">最終受注:</span>
                          <span className="font-medium">{customer.lastOrder}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">総受注件数:</span>
                          <span className="font-medium">{customer.totalOrders}件</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">平均単価:</span>
                          <span className="font-medium">¥9,500</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "orders" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">受注管理</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input placeholder="受注番号、顧客名で検索..." />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="状態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  <SelectItem value="urgent">緊急</SelectItem>
                  <SelectItem value="received">受注</SelectItem>
                  <SelectItem value="shipping">配送中</SelectItem>
                  <SelectItem value="completed">完了</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">受注 #{order.id.toString().padStart(4, "0")}</span>
                        <Badge className={getOrderStatusColor(order.status)}>{order.status}</Badge>
                        {order.priority === "緊急" && (
                          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            緊急
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-lg">¥{order.amount.toLocaleString()}</span>
                        <Button variant="outline" size="sm">
                          詳細
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>受注日: {order.date}</span>
                        </div>
                        <div className="flex items-start space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">集荷先</p>
                            <p className="text-gray-600">{order.pickup}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-red-600 mt-0.5" />
                          <div>
                            <p className="font-medium">配送先</p>
                            <p className="text-gray-600">{order.delivery}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <p className="font-medium mb-1">備考・特記事項</p>
                          <p className="text-gray-600 bg-gray-50 p-2 rounded">{order.notes}</p>
                        </div>
                      </div>
                    </div>

                    {order.status === "緊急" && (
                      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center text-red-700">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">緊急案件 - 即座の対応が必要です</span>
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
