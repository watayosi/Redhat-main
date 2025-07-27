"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Truck, CreditCard, FileText, Check, AlertCircle } from "lucide-react"

export default function DriverRegistrationComponent() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // 基本情報
    businessName: "",
    representativeName: "",
    phone: "",
    email: "",
    address: "",
    businessType: "",

    // 車両情報
    vehicles: [
      {
        id: 1,
        number: "",
        type: "",
        model: "",
        year: "",
        capacity: "",
        features: [] as string[],
      },
    ],

    // 支払い・請求情報
    bankName: "",
    branchName: "",
    accountType: "",
    accountNumber: "",
    accountHolder: "",
    invoiceAddress: "",
    taxId: "",

    // 保険・許可証
    insuranceCompany: "",
    insuranceAmount: "",
    licenseNumber: "",
    specialPermits: [] as string[],

    // サービス情報
    serviceAreas: [] as string[],
    specialties: [] as string[],
    workingHours: "",
    emergencyService: false,
  })

  const vehicleTypes = ["軽トラック", "軽バン", "ホロ車", "冷蔵車", "冷凍車", "パワーゲート付き"]

  const vehicleFeatures = [
    "エアコン完備",
    "GPS搭載",
    "ドライブレコーダー",
    "バックカメラ",
    "パワーステアリング",
    "AT車",
    "禁煙車",
  ]

  // serviceAreasを愛媛県の市町村に更新
  const serviceAreas = [
    "松山市",
    "今治市",
    "新居浜市",
    "西条市",
    "大洲市",
    "伊予市",
    "四国中央市",
    "宇和島市",
    "八幡浜市",
    "東温市",
    "上島町",
    "久万高原町",
    "松前町",
    "砥部町",
    "内子町",
    "伊方町",
    "松野町",
    "鬼北町",
    "愛南町",
  ]

  // specialtiesを愛媛県の産業特性に合わせて更新
  const specialties = [
    "書類配送",
    "農産物配送",
    "みかん配送",
    "造船部品配送",
    "化学製品配送",
    "水産物配送",
    "真珠関連配送",
    "製紙原料配送",
    "タオル製品配送",
    "精密機器配送",
  ]

  // specialPermitsに愛媛県特有の許可を追加
  const specialPermits = [
    "農産物配送許可",
    "水産物配送許可",
    "化学物質取扱許可",
    "重量物運搬許可",
    "冷凍食品配送許可",
    "造船業界配送認定",
  ]

  const steps = [
    { id: 1, title: "基本情報", icon: User },
    { id: 2, title: "車両情報", icon: Truck },
    { id: 3, title: "支払い情報", icon: CreditCard },
    { id: 4, title: "許可・保険", icon: FileText },
    { id: 5, title: "サービス情報", icon: Check },
  ]

  const addVehicle = () => {
    setFormData((prev) => ({
      ...prev,
      vehicles: [
        ...prev.vehicles,
        {
          id: prev.vehicles.length + 1,
          number: "",
          type: "",
          model: "",
          year: "",
          capacity: "",
          features: [],
        },
      ],
    }))
  }

  const removeVehicle = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      vehicles: prev.vehicles.filter((v) => v.id !== id),
    }))
  }

  const updateVehicle = (id: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitRegistration = () => {
    // 登録処理（実際のアプリではAPIコール）
    console.log("登録データ:", formData)
    alert("登録申請を受け付けました。審査完了まで2-3営業日お待ちください。")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">赤帽事業者登録</h2>
        <p className="text-gray-600">プラットフォームへの事業者登録を行います</p>
      </div>

      {/* ステップインジケーター */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-500"}`}>
                    ステップ {step.id}
                  </p>
                  <p className="text-xs text-gray-500">{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* フォーム内容 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 mr-2" })}
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ステップ1: 基本情報 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="business-name">事業者名 *</Label>
                  <Input
                    id="business-name"
                    placeholder="例: 松山運送"
                    value={formData.businessName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="representative-name">代表者名 *</Label>
                  <Input
                    id="representative-name"
                    placeholder="例: 田中太郎"
                    value={formData.representativeName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, representativeName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">電話番号 *</Label>
                  <Input
                    id="phone"
                    placeholder="089-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">メールアドレス *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">事業所住所 *</Label>
                <Input
                  id="address"
                  placeholder="愛媛県松山市一番町4-4-2"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="business-type">事業形態</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="事業形態を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">個人事業主</SelectItem>
                    <SelectItem value="corporation">法人</SelectItem>
                    <SelectItem value="partnership">組合</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* ステップ2: 車両情報 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {formData.vehicles.map((vehicle, index) => (
                <Card key={vehicle.id} className="border-2 border-dashed border-gray-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">車両 {index + 1}</CardTitle>
                      {formData.vehicles.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => removeVehicle(vehicle.id)}>
                          削除
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>車両番号 *</Label>
                        <Input
                          placeholder="例: 愛媛 500 あ 1234"
                          value={vehicle.number}
                          onChange={(e) => updateVehicle(vehicle.id, "number", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>車両タイプ *</Label>
                        <Select
                          value={vehicle.type}
                          onValueChange={(value) => updateVehicle(vehicle.id, "type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="車両タイプ" />
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
                      <div>
                        <Label>車種・モデル</Label>
                        <Input
                          placeholder="例: スズキ キャリイ"
                          value={vehicle.model}
                          onChange={(e) => updateVehicle(vehicle.id, "model", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>年式</Label>
                        <Input
                          placeholder="例: 2020"
                          value={vehicle.year}
                          onChange={(e) => updateVehicle(vehicle.id, "year", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>積載量</Label>
                        <Input
                          placeholder="例: 350kg"
                          value={vehicle.capacity}
                          onChange={(e) => updateVehicle(vehicle.id, "capacity", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>車両の特徴・装備</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {vehicleFeatures.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${vehicle.id}-${feature}`}
                              checked={vehicle.features.includes(feature)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateVehicle(vehicle.id, "features", [...vehicle.features, feature])
                                } else {
                                  updateVehicle(
                                    vehicle.id,
                                    "features",
                                    vehicle.features.filter((f) => f !== feature),
                                  )
                                }
                              }}
                            />
                            <Label htmlFor={`${vehicle.id}-${feature}`} className="text-sm">
                              {feature}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" onClick={addVehicle} className="w-full">
                <Truck className="w-4 h-4 mr-2" />
                車両を追加
              </Button>
            </div>
          )}

          {/* ステップ3: 支払い情報 */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bank-name">銀行名 *</Label>
                  <Input
                    id="bank-name"
                    placeholder="例: 伊予銀行"
                    value={formData.bankName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bankName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="branch-name">支店名 *</Label>
                  <Input
                    id="branch-name"
                    placeholder="例: 松山支店"
                    value={formData.branchName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, branchName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="account-type">口座種別 *</Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, accountType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="口座種別" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ordinary">普通</SelectItem>
                      <SelectItem value="current">当座</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="account-number">口座番号 *</Label>
                  <Input
                    id="account-number"
                    placeholder="1234567"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData((prev) => ({ ...prev, accountNumber: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="account-holder">口座名義 *</Label>
                  <Input
                    id="account-holder"
                    placeholder="タナカ タロウ"
                    value={formData.accountHolder}
                    onChange={(e) => setFormData((prev) => ({ ...prev, accountHolder: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="invoice-address">請求書送付先住所</Label>
                <Input
                  id="invoice-address"
                  placeholder="事業所住所と異なる場合のみ入力"
                  value={formData.invoiceAddress}
                  onChange={(e) => setFormData((prev) => ({ ...prev, invoiceAddress: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="tax-id">法人番号・事業者番号</Label>
                <Input
                  id="tax-id"
                  placeholder="法人の場合は法人番号を入力"
                  value={formData.taxId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, taxId: e.target.value }))}
                />
              </div>
            </div>
          )}

          {/* ステップ4: 許可・保険 */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="insurance-company">保険会社名 *</Label>
                  <Input
                    id="insurance-company"
                    placeholder="例: 東京海上日動"
                    value={formData.insuranceCompany}
                    onChange={(e) => setFormData((prev) => ({ ...prev, insuranceCompany: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="insurance-amount">保険金額 *</Label>
                  <Input
                    id="insurance-amount"
                    placeholder="例: 10,000,000"
                    value={formData.insuranceAmount}
                    onChange={(e) => setFormData((prev) => ({ ...prev, insuranceAmount: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="license-number">運送業許可番号</Label>
                <Input
                  id="license-number"
                  placeholder="許可番号を入力"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                />
              </div>

              <div>
                <Label>特別許可・資格</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {specialPermits.map((permit) => (
                    <div key={permit} className="flex items-center space-x-2">
                      <Checkbox
                        id={permit}
                        checked={formData.specialPermits.includes(permit)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData((prev) => ({
                              ...prev,
                              specialPermits: [...prev.specialPermits, permit],
                            }))
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              specialPermits: prev.specialPermits.filter((p) => p !== permit),
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={permit} className="text-sm">
                        {permit}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">書類のアップロードについて</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      保険証券、許可証等の書類は登録完了後にマイページからアップロードしてください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ステップ5: サービス情報 */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <Label>対応エリア *</Label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {serviceAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={formData.serviceAreas.includes(area)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData((prev) => ({
                              ...prev,
                              serviceAreas: [...prev.serviceAreas, area],
                            }))
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              serviceAreas: prev.serviceAreas.filter((a) => a !== area),
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={area} className="text-sm">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>専門分野・得意分野</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {specialties.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={formData.specialties.includes(specialty)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData((prev) => ({
                              ...prev,
                              specialties: [...prev.specialties, specialty],
                            }))
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              specialties: prev.specialties.filter((s) => s !== specialty),
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={specialty} className="text-sm">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="working-hours">営業時間</Label>
                <Input
                  id="working-hours"
                  placeholder="例: 8:00-20:00"
                  value={formData.workingHours}
                  onChange={(e) => setFormData((prev) => ({ ...prev, workingHours: e.target.value }))}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emergency-service"
                  checked={formData.emergencyService}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, emergencyService: !!checked }))}
                />
                <Label htmlFor="emergency-service">緊急配送対応可能（24時間対応）</Label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">登録内容の確認</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>事業者名:</strong> {formData.businessName}
                  </p>
                  <p>
                    <strong>代表者:</strong> {formData.representativeName}
                  </p>
                  <p>
                    <strong>車両数:</strong> {formData.vehicles.length}台
                  </p>
                  <p>
                    <strong>対応エリア:</strong> {formData.serviceAreas.length}区
                  </p>
                  <p>
                    <strong>専門分野:</strong> {formData.specialties.length}分野
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ナビゲーションボタン */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              前へ
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={nextStep}>次へ</Button>
            ) : (
              <Button onClick={submitRegistration} className="bg-green-600 hover:bg-green-700">
                登録申請
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
