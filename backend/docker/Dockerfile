FROM fedora:35

RUN dnf install --refresh -y python3 python3-devel python3-pip

COPY requirements.txt .

RUN pip install virtualenv

RUN python3 -m venv venv

RUN source venv/bin/activate

RUN pip install -r requirements.txt

COPY main.py .

COPY api/ api/

EXPOSE 9999

CMD ["python3", "-m", "main"]
