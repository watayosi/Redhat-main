"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Phone, Users, Search, Plus, Clock, Truck } from "lucide-react"

interface CommunicationComponentProps {
  userType?: "carrier" | "shipper"
}

export default function CommunicationComponent({ userType = "carrier" }: CommunicationComponentProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState("")

  // 事業者向けチャット一覧（他の事業者との連携）
  const carrierChats = [
    {
      id: 1,
      name: "今治物流",
      lastMessage: "明日の造船部品配送、お疲れ様でした",
      time: "14:30",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "carrier",
      status: "online",
    },
    {
      id: 2,
      name: "宇和島配送",
      lastMessage: "水産物の冷蔵配送について相談があります",
      time: "12:15",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "carrier",
      status: "offline",
    },
    {
      id: 3,
      name: "愛媛みかん農協",
      lastMessage: "来週のみかん配送の件でご連絡します",
      time: "昨日",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "shipper",
      status: "online",
    },
  ]

  // 荷主向けチャット一覧（事業者との連絡）
  const shipperChats = [
    {
      id: 1,
      name: "松山運送",
      lastMessage: "書類配送が完了しました。ありがとうございました。",
      time: "15:20",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "carrier",
      status: "online",
      currentJob: "書類配送中",
    },
    {
      id: 2,
      name: "新居浜物流",
      lastMessage: "機材の集荷時間を16:00に変更可能でしょうか？",
      time: "13:45",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "carrier",
      status: "online",
      currentJob: "機材運搬予定",
    },
    {
      id: 3,
      name: "四国中央運送",
      lastMessage: "見積もりをお送りしました。ご確認ください。",
      time: "昨日",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "carrier",
      status: "offline",
      currentJob: "見積もり中",
    },
  ]

  const currentChats = userType === "carrier" ? carrierChats : shipperChats

  const messages = [
    {
      id: 1,
      sender: userType === "carrier" ? "今治物流" : "松山運送",
      content:
        userType === "carrier"
          ? "お疲れ様です。明日の造船部品配送の件でご連絡しました。"
          : "書類配送が完了しました。受取確認書をお送りします。",
      time: "14:25",
      isOwn: false,
    },
    {
      id: 2,
      sender: "あなた",
      content:
        userType === "carrier"
          ? "お疲れ様です。明日の件、承知いたしました。"
          : "ありがとうございます。確認いたします。",
      time: "14:27",
      isOwn: true,
    },
    {
      id: 3,
      sender: userType === "carrier" ? "今治物流" : "松山運送",
      content:
        userType === "carrier" ? "集荷時間は10:00からでよろしいでしょうか？" : "次回の配送依頼もよろしくお願いします。",
      time: "14:30",
      isOwn: false,
    },
  ]

  const sendMessage = () => {
    if (newMessage.trim()) {
      // メッセージ送信処理（実際のアプリではAPIコール）
      console.log("メッセージ送信:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">メッセージ</h2>
        <p className="text-gray-600">
          {userType === "carrier"
            ? "他の赤帽事業者や荷主とのコミュニケーション"
            : "配送を依頼した事業者とのコミュニケーション"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* チャット一覧 */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {userType === "carrier" ? "連携・顧客" : "配送事業者"}
              </CardTitle>
              {userType === "carrier" && (
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {currentChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 cursor-pointer hover:bg-gray-50 border-b ${
                    selectedChat === chat.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      {chat.status === "online" && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{chat.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{chat.time}</span>
                          {chat.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                      {userType === "shipper" && "currentJob" in chat && (
                        <div className="flex items-center mt-1">
                          <Truck className="w-3 h-3 mr-1 text-blue-500" />
                          <span className="text-xs text-blue-600">{chat.currentJob}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* チャット画面 */}
        <Card className="lg:col-span-2">
          {selectedChat ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>{currentChats.find((c) => c.id === selectedChat)?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{currentChats.find((c) => c.id === selectedChat)?.name}</h3>
                      <p className="text-sm text-gray-500">
                        {currentChats.find((c) => c.id === selectedChat)?.status === "online"
                          ? "オンライン"
                          : "オフライン"}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col h-[400px]">
                {/* メッセージ一覧 */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.isOwn ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-end mt-1">
                          <Clock className="w-3 h-3 mr-1 opacity-70" />
                          <span className="text-xs opacity-70">{message.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* メッセージ入力 */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="メッセージを入力..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[40px] max-h-[100px]"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                    />
                    <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>チャットを選択してメッセージを開始</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* 機能説明 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">{userType === "carrier" ? "事業者間連携" : "リアルタイム連絡"}</h4>
            <p className="text-sm text-gray-600">
              {userType === "carrier"
                ? "他の赤帽事業者と連携して効率的な配送ネットワークを構築"
                : "配送状況の確認や変更依頼をリアルタイムで事業者と連絡"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">{userType === "carrier" ? "顧客サポート" : "安心サポート"}</h4>
            <p className="text-sm text-gray-600">
              {userType === "carrier"
                ? "荷主からの問い合わせに迅速に対応し、信頼関係を構築"
                : "配送に関する疑問や要望を気軽に事業者に相談"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
