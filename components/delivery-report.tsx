"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Camera,
  PenTool,
  Mail,
  Download,
  Calendar,
  Clock,
  Package,
  User,
  CheckCircle,
  Send,
  Save,
  Eye,
  Trash2,
  Edit,
} from "lucide-react"

interface DeliveryReportProps {
  userType: "carrier" | "shipper"
}

export default function DeliveryReport({ userType }: DeliveryReportProps) {
  const [activeTab, setActiveTab] = useState("create")
  const [selectedJob, setSelectedJob] = useState("")
  const [signatureData, setSignatureData] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [reportData, setReportData] = useState({
    jobId: "",
    customerName: "",
    customerPhone: "",
    deliveryDate: "",
    deliveryTime: "",
    pickupAddress: "",
    deliveryAddress: "",
    cargoDescription: "",
    receiverName: "",
    receiverPhone: "",
    notes: "",
    signatureType: "digital", // digital, stamp, photo
    status: "draft", // draft, completed, sent
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // サンプルデータ
  const completedJobs = [
    {
      id: "JOB-001",
      title: "松山市→今治市 みかん配送",
      customer: "愛媛みかん農園",
      phone: "089-123-4567",
      date: "2025-01-24",
      time: "15:45",
      pickup: "松山市久米窪田町1-1",
      delivery: "今治市常盤町1-1-1",
      cargo: "みかん 20箱",
      price: "¥12,500",
      status: "completed",
    },
    {
      id: "JOB-002",
      title: "新居浜市→四国中央市 化学製品配送",
      customer: "四国化学工業",
      phone: "0897-456-7890",
      date: "2025-01-24",
      time: "17:00",
      pickup: "新居浜市一宮町1-1-1",
      delivery: "四国中央市三島中央1-1-1",
      cargo: "化学製品 5ケース",
      price: "¥9,800",
      status: "completed",
    },
  ]

  const savedReports = [
    {
      id: "RPT-001",
      jobId: "JOB-001",
      title: "松山市→今治市 みかん配送",
      customer: "愛媛みかん農園",
      date: "2025-01-24",
      status: "completed",
      hasSigned: true,
      sentAt: "2025-01-24 16:30",
    },
    {
      id: "RPT-002",
      jobId: "JOB-002",
      title: "新居浜市→四国中央市 化学製品配送",
      customer: "四国化学工業",
      date: "2025-01-24",
      status: "draft",
      hasSigned: false,
      sentAt: null,
    },
  ]

  // 署名パッド機能
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.beginPath()
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
        ctx.stroke()
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      setSignatureData(canvas.toDataURL())
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    setSignatureData("")
  }

  // 写真撮影機能（モック）
  const takePhoto = () => {
    // 実際の実装では camera API を使用
    const mockPhoto = `/placeholder.svg?height=200&width=300&text=配送完了写真${photos.length + 1}`
    setPhotos([...photos, mockPhoto])
  }

  // 報告書保存
  const saveReport = () => {
    console.log("報告書を保存:", reportData)
    alert("報告書が保存されました")
  }

  // メール送信
  const sendReport = () => {
    console.log("報告書をメール送信:", reportData)
    alert("報告書をメール送信しました")
  }

  // PDF出力
  const downloadPDF = () => {
    console.log("PDF出力:", reportData)
    alert("PDFをダウンロードしました")
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">作業完了報告</h2>
        <p className="text-sm sm:text-base text-gray-600">配送完了後の報告書作成・受領確認・保管・送信管理</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create" className="text-xs sm:text-sm">
            <FileText className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">報告書作成</span>
            <span className="sm:hidden">作成</span>
          </TabsTrigger>
          <TabsTrigger value="manage" className="text-xs sm:text-sm">
            <Save className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">報告書管理</span>
            <span className="sm:hidden">管理</span>
          </TabsTrigger>
          <TabsTrigger value="statistics" className="text-xs sm:text-sm">
            <CheckCircle className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">統計・履歴</span>
            <span className="sm:hidden">統計</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* 基本情報入力 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                  基本情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="job-select">完了した配送案件</Label>
                  <Select value={selectedJob} onValueChange={setSelectedJob}>
                    <SelectTrigger>
                      <SelectValue placeholder="配送案件を選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {completedJobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title} - {job.customer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedJob && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customer-name">顧客名</Label>
                        <Input
                          id="customer-name"
                          value={reportData.customerName}
                          onChange={(e) => setReportData({ ...reportData, customerName: e.target.value })}
                          placeholder="顧客名を入力"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customer-phone">顧客電話番号</Label>
                        <Input
                          id="customer-phone"
                          value={reportData.customerPhone}
                          onChange={(e) => setReportData({ ...reportData, customerPhone: e.target.value })}
                          placeholder="電話番号を入力"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="delivery-date">配送完了日</Label>
                        <Input
                          id="delivery-date"
                          type="date"
                          value={reportData.deliveryDate}
                          onChange={(e) => setReportData({ ...reportData, deliveryDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="delivery-time">配送完了時刻</Label>
                        <Input
                          id="delivery-time"
                          type="time"
                          value={reportData.deliveryTime}
                          onChange={(e) => setReportData({ ...reportData, deliveryTime: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickup-address">集荷先住所</Label>
                      <Input
                        id="pickup-address"
                        value={reportData.pickupAddress}
                        onChange={(e) => setReportData({ ...reportData, pickupAddress: e.target.value })}
                        placeholder="集荷先住所を入力"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="delivery-address">配送先住所</Label>
                      <Input
                        id="delivery-address"
                        value={reportData.deliveryAddress}
                        onChange={(e) => setReportData({ ...reportData, deliveryAddress: e.target.value })}
                        placeholder="配送先住所を入力"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cargo-description">荷物内容</Label>
                      <Textarea
                        id="cargo-description"
                        value={reportData.cargoDescription}
                        onChange={(e) => setReportData({ ...reportData, cargoDescription: e.target.value })}
                        placeholder="荷物の詳細を入力"
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* 受領者情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  受領者情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="receiver-name">受領者氏名</Label>
                  <Input
                    id="receiver-name"
                    value={reportData.receiverName}
                    onChange={(e) => setReportData({ ...reportData, receiverName: e.target.value })}
                    placeholder="受領者の氏名を入力"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receiver-phone">受領者電話番号</Label>
                  <Input
                    id="receiver-phone"
                    value={reportData.receiverPhone}
                    onChange={(e) => setReportData({ ...reportData, receiverPhone: e.target.value })}
                    placeholder="受領者の電話番号を入力"
                  />
                </div>

                <div className="space-y-2">
                  <Label>受領確認方法</Label>
                  <Select
                    value={reportData.signatureType}
                    onValueChange={(value) => setReportData({ ...reportData, signatureType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">デジタル署名</SelectItem>
                      <SelectItem value="stamp">印鑑押印</SelectItem>
                      <SelectItem value="photo">書類写真</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 署名パッド */}
                {reportData.signatureType === "digital" && (
                  <div className="space-y-2">
                    <Label>デジタル署名</Label>
                    <div className="border rounded-lg p-2">
                      <canvas
                        ref={canvasRef}
                        width={300}
                        height={150}
                        className="border border-gray-300 rounded w-full cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                      />
                      <div className="flex justify-between mt-2">
                        <Button variant="outline" size="sm" onClick={clearSignature}>
                          クリア
                        </Button>
                        <span className="text-xs text-gray-500">上記エリアに署名してください</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">特記事項</Label>
                  <Textarea
                    id="notes"
                    value={reportData.notes}
                    onChange={(e) => setReportData({ ...reportData, notes: e.target.value })}
                    placeholder="配送時の特記事項があれば入力"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 写真撮影セクション */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                配送写真
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={takePhoto} variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    写真撮影
                  </Button>
                  <span className="text-sm text-gray-500 self-center">配送前後の荷物状態を撮影してください</span>
                </div>

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`配送写真 ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Button onClick={saveReport} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              下書き保存
            </Button>
            <Button onClick={downloadPDF} variant="outline" className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              PDF出力
            </Button>
            <Button onClick={sendReport} variant="default" className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              メール送信
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-base sm:text-lg">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                保存済み報告書
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1 mb-2 sm:mb-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-sm sm:text-base">{report.title}</h3>
                        <Badge variant={report.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {report.status === "completed" ? "完了" : "下書き"}
                        </Badge>
                        {report.hasSigned && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            署名済み
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{report.customer}</p>
                      <p className="text-xs text-gray-500">
                        作成日: {report.date}
                        {report.sentAt && ` | 送信日: ${report.sentAt}`}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">表示</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">編集</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">PDF</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">送信</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">今月の報告書</CardTitle>
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-lg sm:text-2xl font-bold">24件</div>
                <p className="text-xs text-gray-500 mt-1">前月比 +8件</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">署名取得率</CardTitle>
                <PenTool className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-lg sm:text-2xl font-bold">95.8%</div>
                <p className="text-xs text-gray-500 mt-1">23/24件</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">メール送信率</CardTitle>
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-lg sm:text-2xl font-bold">100%</div>
                <p className="text-xs text-gray-500 mt-1">24/24件</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">平均作成時間</CardTitle>
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-lg sm:text-2xl font-bold">3.2分</div>
                <p className="text-xs text-gray-500 mt-1">前月比 -0.5分</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                最近の報告書履歴
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedReports.slice(0, 5).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{report.title}</p>
                      <p className="text-xs text-gray-600 truncate">{report.customer}</p>
                      <p className="text-xs text-gray-500">{report.date}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <Badge variant={report.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {report.status === "completed" ? "完了" : "下書き"}
                      </Badge>
                      {report.hasSigned && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
