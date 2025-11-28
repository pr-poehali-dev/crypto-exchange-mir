import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const mockPriceData = [
  { time: '00:00', price: 45000 },
  { time: '04:00', price: 45800 },
  { time: '08:00', price: 44200 },
  { time: '12:00', price: 46500 },
  { time: '16:00', price: 47200 },
  { time: '20:00', price: 48100 },
  { time: '24:00', price: 49200 },
];

const mockCryptoList = [
  { id: 1, symbol: 'BTC', name: 'Bitcoin', price: 49200, change: 8.4, volume: '28.5B', icon: '₿' },
  { id: 2, symbol: 'ETH', name: 'Ethereum', price: 2850, change: 5.2, volume: '15.2B', icon: 'Ξ' },
  { id: 3, symbol: 'BNB', name: 'Binance Coin', price: 425, change: -2.1, volume: '2.8B', icon: '◈' },
  { id: 4, symbol: 'SOL', name: 'Solana', price: 105, change: 12.5, volume: '3.1B', icon: '◎' },
  { id: 5, symbol: 'XRP', name: 'Ripple', price: 0.58, change: -1.8, volume: '1.5B', icon: '✕' },
];

const mockWallet = [
  { symbol: 'BTC', amount: 0.5, value: 24600, icon: '₿' },
  { symbol: 'ETH', amount: 5.2, value: 14820, icon: 'Ξ' },
  { symbol: 'SOL', amount: 50, value: 5250, icon: '◎' },
];

const mockHistory = [
  { id: 1, type: 'buy', crypto: 'BTC', amount: 0.1, price: 48500, date: '2024-11-28 14:30', status: 'completed' },
  { id: 2, type: 'deposit', amount: 50000, method: 'МИР ****1234', date: '2024-11-28 12:15', status: 'completed' },
  { id: 3, type: 'buy', crypto: 'ETH', amount: 2, price: 2800, date: '2024-11-27 18:20', status: 'completed' },
  { id: 4, type: 'sell', crypto: 'SOL', amount: 20, price: 103, date: '2024-11-27 10:45', status: 'completed' },
  { id: 5, type: 'withdraw', amount: 15000, method: 'МИР ****5678', date: '2024-11-26 16:00', status: 'completed', fee: 1500 },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCrypto, setSelectedCrypto] = useState(mockCryptoList[0]);
  const [buyAmount, setBuyAmount] = useState('');

  const totalBalance = mockWallet.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CryptoEx</span>
            </div>
            
            <nav className="hidden md:flex gap-6">
              {[
                { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
                { id: 'trade', label: 'Торговля', icon: 'LineChart' },
                { id: 'wallet', label: 'Кошелёк', icon: 'Wallet' },
                { id: 'deposit', label: 'Пополнение', icon: 'ArrowDownToLine' },
                { id: 'history', label: 'История', icon: 'Clock' },
                { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
                { id: 'profile', label: 'Профиль', icon: 'User' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon name={tab.icon as any} size={18} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">ИП</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Общий баланс</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalBalance.toLocaleString('ru-RU')} ₽</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                      <Icon name="TrendingUp" size={14} className="mr-1" />
                      +12.5%
                    </Badge>
                    <span className="text-sm text-muted-foreground">за 24ч</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">В криптовалюте</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalBalance.toLocaleString('ru-RU')} ₽</div>
                  <div className="text-sm text-muted-foreground mt-1">3 актива</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Прибыль 24ч</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">+5,432 ₽</div>
                  <div className="text-sm text-muted-foreground mt-1">+12.5%</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>График портфеля</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockPriceData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#colorPrice)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => setActiveTab('deposit')}>
                    <Icon name="ArrowDownToLine" size={18} className="mr-2" />
                    Пополнить счёт
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('trade')}>
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить крипту
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Icon name="ArrowUpFromLine" size={18} className="mr-2" />
                    Вывести средства
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('analytics')}>
                    <Icon name="BarChart3" size={18} className="mr-2" />
                    Просмотреть аналитику
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Топ криптовалют</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCryptoList.slice(0, 3).map((crypto) => (
                    <div key={crypto.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-xl">
                          {crypto.icon}
                        </div>
                        <div>
                          <div className="font-medium">{crypto.symbol}</div>
                          <div className="text-sm text-muted-foreground">{crypto.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${crypto.price.toLocaleString()}</div>
                        <div className={`text-sm ${crypto.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {crypto.change > 0 ? '+' : ''}{crypto.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'trade' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Рынок криптовалют</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockCryptoList.map((crypto) => (
                    <div
                      key={crypto.id}
                      onClick={() => setSelectedCrypto(crypto)}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedCrypto.id === crypto.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                          {crypto.icon}
                        </div>
                        <div>
                          <div className="font-semibold">{crypto.symbol}</div>
                          <div className="text-sm text-muted-foreground">{crypto.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">${crypto.price.toLocaleString()}</div>
                        <div className={`text-sm font-medium ${crypto.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {crypto.change > 0 ? '+' : ''}{crypto.change}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Объём</div>
                        <div className="text-sm font-medium">{crypto.volume}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>График {selectedCrypto.symbol}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={mockPriceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line type="monotone" dataKey="price" stroke={selectedCrypto.change > 0 ? '#10B981' : '#EF4444'} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Купить {selectedCrypto.symbol}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Сумма (₽)</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="p-3 bg-accent rounded-lg">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Вы получите:</span>
                      <span className="font-medium">
                        {buyAmount ? (parseFloat(buyAmount) / selectedCrypto.price).toFixed(6) : '0.000000'} {selectedCrypto.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Комиссия:</span>
                      <span className="font-medium">0.1%</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить {selectedCrypto.symbol}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Мой кошелёк</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setActiveTab('deposit')}>
                    <Icon name="ArrowDownToLine" size={16} className="mr-2" />
                    Пополнить
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="ArrowUpFromLine" size={16} className="mr-2" />
                    Вывести
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Общая стоимость</div>
                    <div className="text-2xl font-bold">{totalBalance.toLocaleString('ru-RU')} ₽</div>
                  </div>
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Доступно для вывода</div>
                    <div className="text-2xl font-bold">{(totalBalance * 0.9).toLocaleString('ru-RU')} ₽</div>
                    <div className="text-xs text-muted-foreground mt-1">Комиссия 10%</div>
                  </div>
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Активов</div>
                    <div className="text-2xl font-bold">{mockWallet.length}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {mockWallet.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                          {asset.icon}
                        </div>
                        <div>
                          <div className="font-semibold">{asset.symbol}</div>
                          <div className="text-sm text-muted-foreground">{asset.amount} {asset.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{asset.value.toLocaleString('ru-RU')} ₽</div>
                        <div className="text-sm text-muted-foreground">
                          ≈ ${(asset.value / 90).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setActiveTab('trade')}>
                          Купить
                        </Button>
                        <Button size="sm" variant="outline">
                          Продать
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'deposit' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Пополнение счёта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Метод пополнения</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 border-2 border-primary bg-primary/5 rounded-lg cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon name="CreditCard" size={24} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">Карта МИР</div>
                          <div className="text-sm text-muted-foreground">Моментально</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Icon name="Landmark" size={24} />
                        </div>
                        <div>
                          <div className="font-semibold">Банковский перевод</div>
                          <div className="text-sm text-muted-foreground">1-3 дня</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Сумма пополнения</label>
                  <Input type="number" placeholder="10000" className="text-lg h-12" />
                  <div className="flex gap-2 mt-3">
                    {[5000, 10000, 25000, 50000].map((amount) => (
                      <Button key={amount} variant="outline" size="sm" className="flex-1">
                        {amount.toLocaleString()} ₽
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-accent rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Комиссия:</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Время зачисления:</span>
                    <span className="font-medium">Моментально</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Итого к зачислению:</span>
                      <span className="font-bold text-lg">10,000 ₽</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Пополнить через карту МИР
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <Icon name="Lock" size={14} className="inline mr-1" />
                  Безопасная оплата через защищённое соединение
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'history' && (
          <Card>
            <CardHeader>
              <CardTitle>История операций</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.type === 'buy' ? 'bg-green-500/10' :
                        item.type === 'sell' ? 'bg-red-500/10' :
                        item.type === 'deposit' ? 'bg-blue-500/10' :
                        'bg-orange-500/10'
                      }`}>
                        <Icon 
                          name={
                            item.type === 'buy' ? 'ArrowDownToLine' :
                            item.type === 'sell' ? 'ArrowUpFromLine' :
                            item.type === 'deposit' ? 'Plus' :
                            'Minus'
                          } 
                          size={20}
                          className={
                            item.type === 'buy' ? 'text-green-500' :
                            item.type === 'sell' ? 'text-red-500' :
                            item.type === 'deposit' ? 'text-blue-500' :
                            'text-orange-500'
                          }
                        />
                      </div>
                      <div>
                        <div className="font-medium">
                          {item.type === 'buy' && `Покупка ${item.crypto}`}
                          {item.type === 'sell' && `Продажа ${item.crypto}`}
                          {item.type === 'deposit' && 'Пополнение счёта'}
                          {item.type === 'withdraw' && 'Вывод средств'}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.crypto && (
                        <div className="font-medium">
                          {item.amount} {item.crypto} × ${item.price?.toLocaleString()}
                        </div>
                      )}
                      {item.method && (
                        <div className="font-medium">
                          {item.amount?.toLocaleString()} ₽
                        </div>
                      )}
                      {item.fee && (
                        <div className="text-sm text-orange-500">
                          Комиссия: {item.fee.toLocaleString()} ₽ (10%)
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">{item.method}</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                      {item.status === 'completed' ? 'Завершено' : 'В обработке'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Доходность портфеля</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">+18.4%</div>
                  <div className="text-sm text-muted-foreground mt-1">за последние 30 дней</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Лучший актив</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">SOL</div>
                  <div className="text-sm text-green-500 mt-1">+45.2%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Всего операций</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <div className="text-sm text-muted-foreground mt-1">за месяц</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Распределение активов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWallet.map((asset, index) => {
                    const percentage = (asset.value / totalBalance) * 100;
                    return (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{asset.icon}</span>
                            <span className="font-medium">{asset.symbol}</span>
                          </div>
                          <span className="font-medium">{percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>История стоимости портфеля</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockPriceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area type="monotone" dataKey="price" stroke="#10B981" fill="url(#colorValue)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Профиль</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">ИП</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xl font-bold">Иван Петров</div>
                    <div className="text-sm text-muted-foreground">ivan.petrov@email.com</div>
                    <Badge className="mt-2 bg-green-500/10 text-green-500">
                      <Icon name="CheckCircle" size={14} className="mr-1" />
                      Верифицирован
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Имя</label>
                    <Input defaultValue="Иван" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Фамилия</label>
                    <Input defaultValue="Петров" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input defaultValue="ivan.petrov@email.com" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <Input defaultValue="+7 (999) 123-45-67" />
                  </div>
                </div>

                <Button>Сохранить изменения</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Верификация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" size={20} className="text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium">Email подтверждён</div>
                      <div className="text-sm text-muted-foreground">ivan.petrov@email.com</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" size={20} className="text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium">Телефон подтверждён</div>
                      <div className="text-sm text-muted-foreground">+7 (999) 123-45-67</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" size={20} className="text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium">Документы проверены</div>
                      <div className="text-sm text-muted-foreground">Лимиты сняты</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="ShieldCheck" size={20} className="text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Полная верификация завершена</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Вы можете совершать неограниченные операции с криптовалютой
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
