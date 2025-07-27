"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Package, ArrowRight, Users, MapPin, Calculator, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
      <header className="bg-white shadow-sm px-3 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">赤帽プラットフォーム</h1>
              <p className="text-sm text-gray-600 hidden sm:block">愛媛県の配送マッチングシステム</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            愛媛県の配送を効率化する
            <br className="sm:hidden" />
            マッチングプラットフォーム
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            赤帽事業者と荷主をつなぎ、愛媛県内の配送をより効率的に。
            <br className="hidden sm:block" />
            みかん、水産物、造船部品など地域特産品の配送に特化したシステムです。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* 事業者向けカード */}
          <Card className="border-2 border-red-200 hover:border-red-300 transition-colors">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-red-700">赤帽事業者の方</CardTitle>
              <p className="text-sm sm:text-base text-gray-600">求車案件の検索・応募、料金見積もり、事業者連携など</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>愛媛県内の案件検索</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calculator className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>自動料金見積もり</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>事業者間連携</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MessageSquare className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>リアルタイム連絡</span>
                </div>
              </div>
              <Link href="/carrier" className="block">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  事業者向けアプリを開く
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 荷主向けカード */}
          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-blue-700">荷主の方</CardTitle>
              <p className="text-sm sm:text-base text-gray-600">配送依頼の投稿、事業者検索、配送状況の追跡など</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Package className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>簡単配送依頼</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>信頼できる事業者</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>配送状況追跡</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calculator className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>複数社見積比較</span>
                </div>
              </div>
              <Link href="/shipper" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  荷主向けアプリを開く
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* 特徴セクション */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8">
            愛媛県特化の配送プラットフォーム
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">地域特産品対応</h4>
              <p className="text-sm text-gray-600">みかん、水産物、造船部品など愛媛県の特産品配送に最適化</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">県内全域カバー</h4>
              <p className="text-sm text-gray-600">松山市、今治市、新居浜市など愛媛県内全域の配送ネットワーク</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">地域密着型</h4>
              <p className="text-sm text-gray-600">地域の事業者同士の連携で効率的な配送ネットワークを構築</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">赤帽プラットフォーム</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 赤帽プラットフォーム. All rights reserved. 愛媛県の配送を効率化します。
          </p>
        </div>
      </footer>
    </div>
  )
}
