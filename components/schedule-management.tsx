"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, AlertTriangle, Plus, Search } from "lucide-react"

export default function ScheduleManagement() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      time: "09:00",
      pickup: "新宿区西新宿1-1-1",
      delivery: "池袋区東池袋1-1-1",
      customer: "株式会社サンプル",
      driver: "田中",
      vehicle: "A-001",
      status: "進行中",
      priority: "通常",
    },
    {
      id: 2,
      time: "11:30",
      pickup: "品川区港南1-1-1",
      delivery: "渋谷区道玄坂1-1-1",
      customer: "テスト商事",
      driver: "佐藤",
      vehicle: "A-002",
      status: "緊急",
      priority: "緊急",
    },
    {
      id: 3,
      time: "14:00",
      pickup: "港区赤坂1-1-1",
      delivery: "中央区銀座1-1-1",
      customer: "サンプル物流",
      driver: "未割当",
      vehicle: "未割当",
      status: "予定",
      priority: "通常",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "進行中":
        return "bg-blue-100 text-blue-700"
      case "緊急":
        return "bg-red-100 text-red-700"
      case "完了":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "緊急":
        return "bg-red-100 text-red-700 border-red-200"
      case "高":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">配送スケジュール管理</h2>
          <p className="text-gray-600">配送予定の管理とAI最適化</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          新規配送追加
        </Button>
      </div>

      {/* AI機能カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-800">AI配車最適化</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-blue-700 mb-3">効率的なルートと配車を自動提案</p>
            <Button size="sm" variant="outline" className="bg-white text-blue-700 border-blue-300">
              最適化実行
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-800">ダブルブッキング防止</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-green-700 mb-3">AIが重複予約を自動検知</p>
            <Button size="sm" variant="outline" className="bg-white text-green-700 border-green-300">
              チェック実行
            </Button>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-yellow-800">緊急対応支援</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-yellow-700 mb-3">急なキャンセル時の再配車提案</p>
            <Button size="sm" variant="outline" className="bg-white text-yellow-700 border-yellow-300">
              リカバリー案作成
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 検索・フィルター */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">配送予定一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1">
              <Input placeholder="顧客名、住所で検索..." className="w-full" />
            </div>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="状態" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全て</SelectItem>
                <SelectItem value="scheduled">予定</SelectItem>
                <SelectItem value="progress">進行中</SelectItem>
                <SelectItem value="urgent">緊急</SelectItem>
                <SelectItem value="completed">完了</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {schedules.map((schedule) => (
              <Card key={schedule.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {schedule.time}
                      </div>
                      <Badge variant="outline" className={getPriorityColor(schedule.priority)}>
                        {schedule.priority}
                      </Badge>
                      <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        編集
                      </Button>
                      <Button variant="outline" size="sm">
                        詳細
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-start space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">集荷先</p>
                          <p className="text-sm text-gray-600">{schedule.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">配送先</p>
                          <p className="text-sm text-gray-600">{schedule.delivery}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">顧客:</span>
                          <span className="font-medium">{schedule.customer}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">ドライバー:</span>
                          <span className={schedule.driver === "未割当" ? "text-red-600" : "font-medium"}>
                            {schedule.driver}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">車両:</span>
                          <span className={schedule.vehicle === "未割当" ? "text-red-600" : "font-medium"}>
                            {schedule.vehicle}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {schedule.priority === "緊急" && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center text-red-700">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">緊急案件 - 優先対応が必要です</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 新規追加フォーム */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>新規配送予定追加</CardTitle>
            <CardDescription>新しい配送予定を登録します</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pickup-time">集荷時間</Label>
                <Input id="pickup-time" type="time" />
              </div>
              <div>
                <Label htmlFor="priority">優先度</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="優先度を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">通常</SelectItem>
                    <SelectItem value="high">高</SelectItem>
                    <SelectItem value="urgent">緊急</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="customer">顧客名</Label>
              <Input id="customer" placeholder="顧客名を入力" />
            </div>

            <div>
              <Label htmlFor="pickup-address">集荷先住所</Label>
              <Input id="pickup-address" placeholder="集荷先住所を入力" />
            </div>

            <div>
              <Label htmlFor="delivery-address">配送先住所</Label>
              <Input id="delivery-address" placeholder="配送先住所を入力" />
            </div>

            <div>
              <Label htmlFor="notes">備考</Label>
              <Textarea id="notes" placeholder="特記事項があれば入力" />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                キャンセル
              </Button>
              <Button onClick={() => setShowAddForm(false)}>登録</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
