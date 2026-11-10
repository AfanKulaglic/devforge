import io
p='src/lib/postsPremium.ts'
raw=io.open(p,encoding='utf-8').read()
bad='    "Dovoljna je jedna rečenica: čime se bavite.\n" +'
good='    "Dovoljna je jedna rečenica: čime se bavite.\n" +'
raw=raw.replace(bad,good)
io.open(p,'w',encoding='utf-8',newline='\n').write(raw)
print('patched' if good in raw else 'FAIL')
