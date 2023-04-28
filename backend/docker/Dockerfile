FROM fedora:35

RUN dnf install --refresh -y python3 python3-devel python3-pip mysql-connector-python3 

WORKDIR /backend

RUN pip install virtualenv

RUN python3 -m venv venv

RUN source venv/bin/activate

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY src/main.py ./main.py

COPY src/api/ ./api/

CMD ["python3", "-m", "main"]
