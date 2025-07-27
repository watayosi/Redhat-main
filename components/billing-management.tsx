"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, DollarSign, AlertTriangle, CheckCircle, Clock, Download, Plus, Search } from "lucide-react"

export default function BillingManagement() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: "INV-2024-001",
      customer: "株式会社サンプル",
      amount: 85000,
      issueDate: "2024-01-15",
      dueDate: "2024-02-14",
      status: "支払済",
      items: 10,
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-002",
      customer: "テスト商事株式会社",
      amount: 120000,
      issueDate: "2024-01-20",
      dueDate: "2024-02-19",
      status: "未払い",
      items: 15,
    },
    {
      id: 3,
      invoiceNumber: "INV-2024-003",
      customer: "サンプル物流",
      amount: 65000,
      issueDate: "2024-01-22",
      dueDate: "2024-02-21",
      status: "未請求",
      items: 8,
    },
  ])

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2024-01-20",
      category: "燃料費",
      amount: 15000,
      description: "ガソリン代",
      receipt: true,
    },
    {
      id: 2,
      date: "2024-01-18",
      category: "車両整備",
      amount: 25000,
      description: "定期点検費用",
      receipt: true,
    },
    {
      id: 3,
      date: "2024-01-15",
      category: "高速代",
      amount: 3500,
      description: "配送時高速料金",
      receipt: false,
    },
  ])

  const [activeTab, setActiveTab] = useState("invoices")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "支払済":
        return "bg-green-100 text-green-700"
      case "未払い":
        return "bg-red-100 text-red-700"
      case "未請求":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const unpaidAmount = invoices.filter((inv) => inv.status === "未払い").reduce((sum, inv) => sum + inv.amount, 0)
  const unbilledAmount = invoices.filter((inv) => inv.status === "未請求").reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">請求・精算管理</h2>
          <p className="text-gray-600">請求書作成と精算業務の自動化</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            一括ダウンロード
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            新規請求書
          </Button>
        </div>
      </div>

      {/* AI機能カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-800">AI請求書自動作成</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-blue-700 mb-3">配送データから自動で請求書生成</p>
            <Button size="sm" variant="outline" className="bg-white text-blue-700 border-blue-300">
              自動作成実行
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-800">金額チェック</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-green-700 mb-3">AIが金額ミスを自動検知</p>
            <Button size="sm" variant="outline" className="bg-white text-green-700 border-green-300">
              チェック実行
            </Button>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-yellow-800">伝票読み取り</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-yellow-700 mb-3">手書き伝票を自動でデータ化</p>
            <Button size="sm" variant="outline" className="bg-white text-yellow-700 border-yellow-300">
              読み取り開始
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 売上・支出サマリー */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">今月売上</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">前月比 +12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">未回収金額</CardTitle>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">¥{unpaidAmount.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">2件の未払い</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">未請求金額</CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">¥{unbilledAmount.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">1件の未請求</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">今月支出</CardTitle>
            <FileText className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">前月比 -5%</p>
          </CardContent>
        </Card>
      </div>

      {/* タブ切り替え */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "invoices" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("invoices")}
        >
          請求書管理
        </Button>
        <Button
          variant={activeTab === "expenses" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("expenses")}
        >
          経費管理
        </Button>
      </div>

      {activeTab === "invoices" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">請求書一覧</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input placeholder="請求書番号、顧客名で検索..." />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="状態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  <SelectItem value="paid">支払済</SelectItem>
                  <SelectItem value="unpaid">未払い</SelectItem>
                  <SelectItem value="unbilled">未請求</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">{invoice.invoiceNumber}</span>
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                        {invoice.status === "未払い" && (
                          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            期限注意
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-xl">¥{invoice.amount.toLocaleString()}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm">
                            編集
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">顧客</p>
                        <p className="font-medium">{invoice.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">発行日</p>
                        <p className="font-medium">{invoice.issueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">支払期限</p>
                        <p className={`font-medium ${invoice.status === "未払い" ? "text-red-600" : ""}`}>
                          {invoice.dueDate}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-600">明細件数: {invoice.items}件</span>
                      {invoice.status === "未請求" && (
                        <Button size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          請求書発行
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "expenses" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">経費管理</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input placeholder="経費項目、説明で検索..." />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="カテゴリ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  <SelectItem value="fuel">燃料費</SelectItem>
                  <SelectItem value="maintenance">車両整備</SelectItem>
                  <SelectItem value="toll">高速代</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <Card key={expense.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">{expense.category}</span>
                        {expense.receipt ? (
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            領収書あり
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            領収書なし
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-lg">¥{expense.amount.toLocaleString()}</span>
                        <Button variant="outline" size="sm">
                          編集
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">日付</p>
                        <p className="font-medium">{expense.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">説明</p>
                        <p className="font-medium">{expense.description}</p>
                      </div>
                    </div>
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
